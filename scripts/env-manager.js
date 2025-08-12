#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EnvironmentManager {
  constructor() {
    this.configDir = path.join(__dirname, '..', 'config', 'environments');
    this.envFile = path.join(__dirname, '..', '.env');
    this.supportedEnvs = ['development', 'testing', 'staging', 'production'];
  }

  /**
   * Switch to a specific environment
   */
  switchEnvironment(env) {
    if (!this.supportedEnvs.includes(env)) {
      console.error(`❌ Invalid environment: ${env}`);
      console.log(`Supported environments: ${this.supportedEnvs.join(', ')}`);
      process.exit(1);
    }

    const envConfigPath = path.join(this.configDir, `${env}.env`);
    
    if (!fs.existsSync(envConfigPath)) {
      console.error(`❌ Environment config not found: ${envConfigPath}`);
      process.exit(1);
    }

    try {
      // Read environment config
      const envConfig = fs.readFileSync(envConfigPath, 'utf8');
      
      // Add build time
      const buildTime = new Date().toISOString();
      const updatedConfig = envConfig.replace(
        /VITE_APP_BUILD_TIME=.*/,
        `VITE_APP_BUILD_TIME=${buildTime}`
      );

      // Write to .env file
      fs.writeFileSync(this.envFile, updatedConfig);
      
      console.log(`✅ Switched to ${env} environment`);
      console.log(`📁 Config: ${envConfigPath}`);
      console.log(`🕒 Build time: ${buildTime}`);
      
      // Show current environment variables
      this.showCurrentEnv();
      
    } catch (error) {
      console.error(`❌ Failed to switch environment: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Show current environment configuration
   */
  showCurrentEnv() {
    if (!fs.existsSync(this.envFile)) {
      console.log('❌ No .env file found');
      return;
    }

    const envContent = fs.readFileSync(this.envFile, 'utf8');
    const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    console.log('\n📋 Current Environment Variables:');
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        console.log(`   ${key}=${value}`);
      }
    });
  }

  /**
   * List all available environments
   */
  listEnvironments() {
    console.log('🌍 Available Environments:');
    this.supportedEnvs.forEach(env => {
      const configPath = path.join(this.configDir, `${env}.env`);
      const exists = fs.existsSync(configPath);
      const status = exists ? '✅' : '❌';
      console.log(`   ${status} ${env} - ${configPath}`);
    });
  }

  /**
   * Validate environment configuration
   */
  validateEnvironment(env) {
    const configPath = path.join(this.configDir, `${env}.env`);
    
    if (!fs.existsSync(configPath)) {
      console.error(`❌ Environment config not found: ${env}`);
      return false;
    }

    const config = fs.readFileSync(configPath, 'utf8');
    const requiredVars = [
      'NODE_ENV',
      'VITE_APP_ENV',
      'VITE_APP_API_URL',
      'VITE_APP_VERSION'
    ];

    const missingVars = [];
    requiredVars.forEach(varName => {
      if (!config.includes(`${varName}=`)) {
        missingVars.push(varName);
      }
    });

    if (missingVars.length > 0) {
      console.error(`❌ Missing required variables in ${env}: ${missingVars.join(', ')}`);
      return false;
    }

    console.log(`✅ Environment ${env} is valid`);
    return true;
  }

  /**
   * Create new environment configuration
   */
  createEnvironment(env, template = 'development') {
    if (this.supportedEnvs.includes(env)) {
      console.error(`❌ Environment ${env} already exists`);
      return;
    }

    const templatePath = path.join(this.configDir, `${template}.env`);
    const newEnvPath = path.join(this.configDir, `${env}.env`);
    
    if (!fs.existsSync(templatePath)) {
      console.error(`❌ Template environment not found: ${template}`);
      return;
    }

    try {
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      const newContent = templateContent
        .replace(new RegExp(`VITE_APP_ENV=${template}`, 'g'), `VITE_APP_ENV=${env}`)
        .replace(new RegExp(`NODE_ENV=${template === 'development' ? 'development' : template}`, 'g'), `NODE_ENV=${env === 'development' ? 'development' : env}`);

      fs.writeFileSync(newEnvPath, newContent);
      console.log(`✅ Created new environment: ${env}`);
      console.log(`📁 Config: ${newEnvPath}`);
      
      // Add to supported environments
      this.supportedEnvs.push(env);
      
    } catch (error) {
      console.error(`❌ Failed to create environment: ${error.message}`);
    }
  }
}

// CLI Interface
const args = process.argv.slice(2);
const command = args[0];
const env = args[1];

const manager = new EnvironmentManager();

switch (command) {
  case 'switch':
  case 'use':
    if (!env) {
      console.error('❌ Please specify an environment');
      console.log('Usage: node scripts/env-manager.js switch <environment>');
      process.exit(1);
    }
    manager.switchEnvironment(env);
    break;
    
  case 'show':
  case 'current':
    manager.showCurrentEnv();
    break;
    
  case 'list':
  case 'ls':
    manager.listEnvironments();
    break;
    
  case 'validate':
    if (!env) {
      console.error('❌ Please specify an environment to validate');
      process.exit(1);
    }
    manager.validateEnvironment(env);
    break;
    
  case 'create':
    if (!env) {
      console.error('❌ Please specify an environment name');
      process.exit(1);
    }
    const template = args[2] || 'development';
    manager.createEnvironment(env, template);
    break;
    
  default:
    console.log('🌍 Environment Manager');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/env-manager.js switch <environment>  - Switch to environment');
    console.log('  node scripts/env-manager.js show                 - Show current environment');
    console.log('  node scripts/env-manager.js list                 - List all environments');
      console.log('  node scripts/env-manager.js validate <env>       - Validate environment');
  console.log('  node scripts/env-manager.js create <env> [template] - Create new environment');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/env-manager.js switch production');
  console.log('  node scripts/env-manager.js create dev development');
  console.log('  node scripts/env-manager.js validate staging');
} 