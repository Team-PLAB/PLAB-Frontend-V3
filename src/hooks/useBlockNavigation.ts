import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UseBlockNavigationProps {
  isEnabled: boolean;
  shouldBlock: boolean;
}

export const useBlockNavigation = ({ isEnabled, shouldBlock }: UseBlockNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isEnabled || !shouldBlock) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '변경 사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?';
    };

    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      if (shouldBlock) {
        const confirmLeave = window.confirm(
          '변경 사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?'
        );
        if (!confirmLeave) {
          window.history.pushState(null, '', window.location.href);
        } else {
          navigate(-1);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isEnabled, shouldBlock, navigate, location.pathname]);

  return {
    isEnabled,
    shouldBlock,
  };
};