import { describe, it, expect, vi } from 'vitest';
import {
  scrollToFeatured,
  scrollToOther,
  scrollToFeaturedMobile,
  scrollToOtherMobile,
  handleFeaturedHover,
  handleOtherHover
} from '../Projects';

describe('Projects internal functions', () => {
  it('scrollToFeatured calls prev or next', () => {
    const prev = vi.fn();
    const next = vi.fn();
    scrollToFeatured('prev', prev, next);
    expect(prev).toHaveBeenCalled();
    scrollToFeatured('next', prev, next);
    expect(next).toHaveBeenCalled();
  });

  it('scrollToOther calls prev or next', () => {
    const prev = vi.fn();
    const next = vi.fn();
    scrollToOther('prev', prev, next);
    expect(prev).toHaveBeenCalled();
    scrollToOther('next', prev, next);
    expect(next).toHaveBeenCalled();
  });

  it('scrollToFeaturedMobile calls prev or next', () => {
    const prev = vi.fn();
    const next = vi.fn();
    scrollToFeaturedMobile('prev', prev, next);
    expect(prev).toHaveBeenCalled();
    scrollToFeaturedMobile('next', prev, next);
    expect(next).toHaveBeenCalled();
  });

  it('scrollToOtherMobile calls prev or next', () => {
    const prev = vi.fn();
    const next = vi.fn();
    scrollToOtherMobile('prev', prev, next);
    expect(prev).toHaveBeenCalled();
    scrollToOtherMobile('next', prev, next);
    expect(next).toHaveBeenCalled();
  });

  it('handleFeaturedHover calls pause/resume and sets hover state', () => {
    const setHover = vi.fn();
    const pause = vi.fn();
    const pauseMobile = vi.fn();
    const resume = vi.fn();
    const resumeMobile = vi.fn();
    handleFeaturedHover(true, setHover, pause, pauseMobile, resume, resumeMobile);
    expect(setHover).toHaveBeenCalledWith(true);
    expect(pause).toHaveBeenCalled();
    expect(pauseMobile).toHaveBeenCalled();
    handleFeaturedHover(false, setHover, pause, pauseMobile, resume, resumeMobile);
    expect(setHover).toHaveBeenCalledWith(false);
    expect(resume).toHaveBeenCalled();
    expect(resumeMobile).toHaveBeenCalled();
  });

  it('handleOtherHover calls pause/resume and sets hover state', () => {
    const setHover = vi.fn();
    const pause = vi.fn();
    const pauseMobile = vi.fn();
    const resume = vi.fn();
    const resumeMobile = vi.fn();
    handleOtherHover(true, setHover, pause, pauseMobile, resume, resumeMobile);
    expect(setHover).toHaveBeenCalledWith(true);
    expect(pause).toHaveBeenCalled();
    expect(pauseMobile).toHaveBeenCalled();
    handleOtherHover(false, setHover, pause, pauseMobile, resume, resumeMobile);
    expect(setHover).toHaveBeenCalledWith(false);
    expect(resume).toHaveBeenCalled();
    expect(resumeMobile).toHaveBeenCalled();
  });

  it('scrollToFeatured calls next for invalid direction', () => {
    const prev = vi.fn();
    const next = vi.fn();
    // @ts-expect-error
    scrollToFeatured('invalid', prev, next);
    expect(prev).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
}); 