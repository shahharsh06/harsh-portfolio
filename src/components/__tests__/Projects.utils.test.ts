import { describe, it, expect, vi } from 'vitest';
import {
  scrollToFeatured,
  scrollToOther,
  scrollToFeaturedMobile,
  scrollToOtherMobile,
  handleFeaturedHover,
  handleOtherHover,
} from '../Projects.utils';

describe('Projects.utils', () => {
  it('scrollToFeatured calls prev/next correctly', () => {
    const prev = vi.fn();
    const next = vi.fn();

    scrollToFeatured('prev', prev, next);
    expect(prev).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalled();

    scrollToFeatured('next', prev, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('scrollToOther calls prev/next correctly', () => {
    const prev = vi.fn();
    const next = vi.fn();

    scrollToOther('prev', prev, next);
    expect(prev).toHaveBeenCalledTimes(1);

    scrollToOther('next', prev, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('scrollToFeaturedMobile calls prev/next correctly', () => {
    const prev = vi.fn();
    const next = vi.fn();

    scrollToFeaturedMobile('prev', prev, next);
    expect(prev).toHaveBeenCalledTimes(1);

    scrollToFeaturedMobile('next', prev, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('scrollToOtherMobile calls prev/next correctly', () => {
    const prev = vi.fn();
    const next = vi.fn();

    scrollToOtherMobile('prev', prev, next);
    expect(prev).toHaveBeenCalledTimes(1);

    scrollToOtherMobile('next', prev, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('handleFeaturedHover toggles pause/resume and state', () => {
    const setHovered = vi.fn();
    const pause = vi.fn();
    const pauseMobile = vi.fn();
    const resume = vi.fn();
    const resumeMobile = vi.fn();

    handleFeaturedHover(true, setHovered, pause, pauseMobile, resume, resumeMobile);
    expect(setHovered).toHaveBeenCalledWith(true);
    expect(pause).toHaveBeenCalled();
    expect(pauseMobile).toHaveBeenCalled();
    expect(resume).not.toHaveBeenCalled();

    handleFeaturedHover(false, setHovered, pause, pauseMobile, resume, resumeMobile);
    expect(setHovered).toHaveBeenCalledWith(false);
    expect(resume).toHaveBeenCalled();
    expect(resumeMobile).toHaveBeenCalled();
  });

  it('handleOtherHover toggles pause/resume and state', () => {
    const setHovered = vi.fn();
    const pause = vi.fn();
    const pauseMobile = vi.fn();
    const resume = vi.fn();
    const resumeMobile = vi.fn();

    handleOtherHover(true, setHovered, pause, pauseMobile, resume, resumeMobile);
    expect(setHovered).toHaveBeenCalledWith(true);
    expect(pause).toHaveBeenCalled();
    expect(pauseMobile).toHaveBeenCalled();

    handleOtherHover(false, setHovered, pause, pauseMobile, resume, resumeMobile);
    expect(setHovered).toHaveBeenCalledWith(false);
    expect(resume).toHaveBeenCalled();
    expect(resumeMobile).toHaveBeenCalled();
  });
});