import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollToSection } from './useScrollToSection';

describe('useScrollToSection', () => {
  beforeEach(() => {
    document.getElementById = vi.fn();
  });

  it('returns a function', () => {
    const { result } = renderHook(() => useScrollToSection());
    expect(typeof result.current).toBe('function');
  });

  it('calls scrollIntoView when element exists', () => {
    const scrollIntoViewMock = vi.fn();
    vi.mocked(document.getElementById).mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    } as unknown as HTMLElement);

    const { result } = renderHook(() => useScrollToSection());
    act(() => {
      result.current('skills');
    });

    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('does not throw when element does not exist', () => {
    vi.mocked(document.getElementById).mockReturnValue(null);

    const { result } = renderHook(() => useScrollToSection());
    expect(() => {
      act(() => {
        result.current('nonexistent');
      });
    }).not.toThrow();
  });
});
