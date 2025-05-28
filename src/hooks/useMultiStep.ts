import { useState, type ReactElement } from 'react';

type StepProp = {
  title: string | ReactElement;
  element: ReactElement;
  img?: string;
};

export const useMultiStep = (steps: StepProp[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const prev = () => {
    setCurrentStepIndex((index) => (index <= 0 ? 0 : index - 1));
  };

  const next = () => {
    setCurrentStepIndex((index) => (index >= steps.length - 1 ? index : index + 1));
  };

  return {
    currentStepIndex,
    currentTitle: steps[currentStepIndex].title,
    currentStep: steps[currentStepIndex].element,
    currentImg: steps[currentStepIndex].img,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    prev,
    next,
  };
};