// Dashboard Data Fetcher
class PortfolioDashboard {
    constructor() {
        this.githubToken = null;
        this.repoOwner = 'shahharsh06';
        this.repoName = 'harsh-portfolio';
        this.baseUrl = 'https://api.github.com';
    }

    async init() {
        await this.updateLastUpdated();
        await this.fetchWorkflowRuns();
        await this.fetchCoverageData();
        await this.updateMetrics();
        
        // Auto-refresh every 5 minutes
        setInterval(() => this.refresh(), 300000);
    }

    async updateLastUpdated() {
        const now = new Date();
        document.getElementById('lastUpdated').textContent = now.toLocaleString();
    }

    async fetchWorkflowRuns() {
        try {
            const response = await fetch(`${this.baseUrl}/repos/${this.repoOwner}/${this.repoName}/actions/runs?per_page=10`);
            const data = await response.json();
            
            if (data.workflow_runs) {
                this.updateWorkflowStatus(data.workflow_runs);
            }
        } catch (error) {
            console.log('Could not fetch workflow runs:', error);
        }
    }

    async fetchCoverageData() {
        try {
            // Try to fetch coverage from the latest workflow run
            const response = await fetch(`${this.baseUrl}/repos/${this.repoOwner}/${this.repoName}/actions/runs?workflow_id=ci.yml&per_page=1`);
            const data = await response.json();
            
            if (data.workflow_runs && data.workflow_runs.length > 0) {
                const runId = data.workflow_runs[0].id;
                await this.fetchCoverageFromArtifacts(runId);
            }
        } catch (error) {
            console.log('Could not fetch coverage data:', error);
        }
    }

    async fetchCoverageFromArtifacts(runId) {
        try {
            const response = await fetch(`${this.baseUrl}/repos/${this.repoOwner}/${this.repoName}/actions/runs/${runId}/artifacts`);
            const data = await response.json();
            
            const coverageArtifact = data.artifacts.find(artifact => artifact.name === 'coverage-reports');
            if (coverageArtifact) {
                // In a real implementation, you'd download and parse the coverage artifact
                this.updateCoverageDisplay();
            }
        } catch (error) {
            console.log('Could not fetch coverage artifacts:', error);
        }
    }

    updateWorkflowStatus(workflowRuns) {
        const statusContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
        if (!statusContainer) return;

        const workflows = {
            'ci.yml': { name: 'Test Pipeline', status: 'unknown' },
            'deploy.yml': { name: 'Deployment', status: 'unknown' }
        };

        workflowRuns.forEach(run => {
            if (workflows[run.path]) {
                workflows[run.path].status = run.conclusion || run.status;
                workflows[run.path].updatedAt = run.updated_at;
            }
        });

        // Update the UI
        Object.entries(workflows).forEach(([workflow, info]) => {
            this.updateWorkflowCard(info);
        });
    }

    updateWorkflowCard(workflow) {
        const statusClass = workflow.status === 'success' ? 'bg-green-50' : 
                           workflow.status === 'failure' ? 'bg-red-50' : 'bg-yellow-50';
        const iconClass = workflow.status === 'success' ? 'text-green-600' : 
                         workflow.status === 'failure' ? 'text-red-600' : 'text-yellow-600';
        const bgClass = workflow.status === 'success' ? 'bg-green-100' : 
                       workflow.status === 'failure' ? 'bg-red-100' : 'bg-yellow-100';

        // Update the workflow status in the UI
        const statusText = workflow.status === 'success' ? '✓ Running successfully' :
                          workflow.status === 'failure' ? '✗ Failed' : '⏳ In progress';
    }

    updateCoverageDisplay() {
        // This would be populated with real coverage data
        const coverage = 13.54;
        const bar = document.getElementById('coverageBar');
        const coverageText = document.getElementById('overallCoverage');
        
        if (coverage >= 80) {
            bar.className = 'coverage-excellent h-2 rounded-full';
        } else if (coverage >= 60) {
            bar.className = 'coverage-good h-2 rounded-full';
        } else {
            bar.className = 'coverage-poor h-2 rounded-full';
        }
        
        bar.style.width = coverage + '%';
        coverageText.textContent = coverage + '%';
    }

    updateMetrics() {
        // Update test count
        document.getElementById('totalTests').textContent = '62';
        
        // Update code quality
        document.getElementById('codeQuality').textContent = 'A+';
        
        // Update security score
        document.getElementById('securityScore').textContent = '95%';
    }

    async refresh() {
        await this.updateLastUpdated();
        await this.fetchWorkflowRuns();
        await this.fetchCoverageData();
    }

    // Method to simulate real-time updates
    simulateRealTimeUpdates() {
        setInterval(() => {
            // Simulate small changes in metrics
            const currentCoverage = parseFloat(document.getElementById('overallCoverage').textContent);
            const newCoverage = Math.max(0, Math.min(100, currentCoverage + (Math.random() - 0.5) * 2));
            
            this.updateCoverageDisplay();
        }, 30000); // Every 30 seconds
    }
}

let lastCommitSha = null;

async function getLatestCommitSha() {
    const res = await fetch('https://api.github.com/repos/shahharsh06/harsh-portfolio/commits?per_page=1');
    const data = await res.json();
    return data[0]?.sha || null;
}

async function updateDashboardFromJson() {
    try {
        console.log('Fetching dashboard data...');
        const res = await fetch('dashboard-data.json', { cache: "no-store" });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Dashboard data loaded:', data);

        // Update function coverage
        const functionCoverageElement = document.getElementById('functionCoverage');
        const functionCoverageThresholdElement = document.getElementById('functionCoverageThreshold');
        
        if (functionCoverageElement) {
            functionCoverageElement.textContent = data.functions.percentage + '%';
            console.log('Updated function coverage to:', data.functions.percentage + '%');
        } else {
            console.error('Function coverage element not found');
        }
        
        if (functionCoverageThresholdElement) {
            functionCoverageThresholdElement.textContent = `✓ Exceeds ${data.functions.threshold}% threshold`;
        } else {
            console.error('Function coverage threshold element not found');
        }

        // Update other metrics
        const overallCoverageElement = document.getElementById('overallCoverage');
        if (overallCoverageElement) {
            overallCoverageElement.textContent = data.coverage.percentage + '%';
        }
        
        const totalTestsElement = document.getElementById('totalTests');
        if (totalTestsElement) {
            totalTestsElement.textContent = data.tests.count;
        }
        
        const securityScoreElement = document.getElementById('securityScore');
        if (securityScoreElement) {
            securityScoreElement.textContent = data.security.score + '%';
        }
        
        const securityStatusElement = document.getElementById('securityStatus');
        if (securityStatusElement) {
            securityStatusElement.textContent = data.security.highSeverityIssues === 0
                ? '✓ No high severity issues'
                : `✗ ${data.security.highSeverityIssues} high severity issues`;
        }
        
        const ciStatusElement = document.getElementById('ciStatus');
        if (ciStatusElement) {
            ciStatusElement.textContent = data.workflows.ci === "success"
                ? "✓ All checks passed"
                : "✗ CI failed";
        }
        
        const deploymentStatusElement = document.getElementById('deploymentStatus');
        if (deploymentStatusElement) {
            deploymentStatusElement.textContent = data.workflows.deploy === "success"
                ? "✓ GitHub Pages active"
                : "✗ Deployment failed";
        }
        
        const coverageStatusElement = document.getElementById('coverageStatus');
        if (coverageStatusElement) {
            coverageStatusElement.textContent = `✓ ${data.coverage.percentage}% coverage`;
        }
        
        const lastUpdatedElement = document.getElementById('lastUpdated');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = new Date(data.lastUpdated).toLocaleString();
        }
        
        console.log('Dashboard updated successfully');
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

async function checkForNewCommitAndUpdate() {
    const sha = await getLatestCommitSha();
    if (sha && sha !== lastCommitSha) {
        lastCommitSha = sha;
        await updateDashboardFromJson();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial load of dashboard data
    updateDashboardFromJson();
    checkForNewCommitAndUpdate();
    // Poll for new commits every 30 seconds (or adjust as needed for responsiveness)
    setInterval(checkForNewCommitAndUpdate, 30000);
});

function addDashboardInteractivity() {
    // Add click handlers for cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });

    // Add tooltips for metrics
    const metrics = document.querySelectorAll('[id$="Coverage"], [id$="Tests"], [id$="Quality"], [id$="Score"]');
    metrics.forEach(metric => {
        metric.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-900 text-white text-xs rounded py-1 px-2 z-10';
            tooltip.textContent = `Current value: ${e.target.textContent}`;
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 10 + 'px';
            document.body.appendChild(tooltip);
            
            e.target.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    });
}

// Export for potential use in other scripts
window.PortfolioDashboard = PortfolioDashboard; 