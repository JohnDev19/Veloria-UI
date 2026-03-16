import * as React from "react";
import { cn } from "../../utils/cn";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface MultiStepFormStep {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  validate?: (data: Record<string, unknown>) => Promise<Record<string, string>> | Record<string, string>;
}

export interface MultiStepFormContextValue {
  currentStep: number;
  totalSteps: number;
  progress: number;
  data: Record<string, unknown>;
  errors: Record<string, string>;
  setField: (key: string, value: unknown) => void;
  setError: (key: string, message: string) => void;
  clearError: (key: string) => void;
  next: () => Promise<void>;
  back: () => void;
  goTo: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
  isValidating: boolean;
}

export interface MultiStepFormProps {
  steps: MultiStepFormStep[];
  onComplete: (data: Record<string, unknown>) => void | Promise<void>;
  stepperPosition?: "top" | "left";
  children: React.ReactNode;
  className?: string;
  defaultData?: Record<string, unknown>;
}

export interface MultiStepFormNavProps {
  nextLabel?: string;
  backLabel?: string;
  completeLabel?: string;
  className?: string;
}

export interface MultiStepFormStepPanelProps {
  children: React.ReactNode;
  className?: string;
}

// ─── Context ───────────────────────────────────────────────────────────────

const MultiStepFormContext = React.createContext<MultiStepFormContextValue | null>(null);

export function useMultiStepForm(): MultiStepFormContextValue {
  const ctx = React.useContext(MultiStepFormContext);
  if (!ctx) throw new Error("useMultiStepForm must be used inside <MultiStepForm>");
  return ctx;
}

// ─── StepperTop ────────────────────────────────────────────────────────────

function StepperTop({
  steps,
  current,
  onGoTo,
}: {
  steps: MultiStepFormStep[];
  current: number;
  onGoTo: (i: number) => void;
}) {
  return (
    <div className="flex items-center w-full mb-8" role="list" aria-label="Form steps">
      {steps.map((step, i) => {
        const status = i < current ? "complete" : i === current ? "current" : "upcoming";
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5" role="listitem">
              <button
                type="button"
                disabled={i > current}
                onClick={() => i < current && onGoTo(i)}
                aria-current={status === "current" ? "step" : undefined}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  status === "complete" && "bg-primary border-primary text-primary-foreground cursor-pointer hover:opacity-80",
                  status === "current" && "border-primary text-primary bg-primary/10 cursor-default",
                  status === "upcoming" && "border-border text-muted-foreground cursor-not-allowed"
                )}
              >
                {status === "complete" ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.icon ?? <span>{i + 1}</span>
                )}
              </button>
              <span
                className={cn(
                  "hidden sm:block text-xs font-medium max-w-[80px] text-center leading-tight",
                  status === "current" && "text-primary",
                  status === "upcoming" && "text-muted-foreground",
                  status === "complete" && "text-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-2 mb-5 transition-colors",
                  i < current ? "bg-primary" : "bg-border"
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── StepperLeft ───────────────────────────────────────────────────────────

function StepperLeft({
  steps,
  current,
  onGoTo,
}: {
  steps: MultiStepFormStep[];
  current: number;
  onGoTo: (i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-0 w-48 shrink-0 pr-6" role="list" aria-label="Form steps">
      {steps.map((step, i) => {
        const status = i < current ? "complete" : i === current ? "current" : "upcoming";
        return (
          <React.Fragment key={i}>
            <div className="flex items-start gap-3" role="listitem">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  disabled={i > current}
                  onClick={() => i < current && onGoTo(i)}
                  aria-current={status === "current" ? "step" : undefined}
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    status === "complete" && "bg-primary border-primary text-primary-foreground cursor-pointer hover:opacity-80",
                    status === "current" && "border-primary text-primary bg-primary/10 cursor-default",
                    status === "upcoming" && "border-border text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {status === "complete" ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.icon ?? <span>{i + 1}</span>
                  )}
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={cn("w-px flex-1 my-1 min-h-[2rem] transition-colors", i < current ? "bg-primary" : "bg-border")}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="pb-6">
                <p
                  className={cn(
                    "text-sm font-medium leading-tight",
                    status === "current" && "text-primary",
                    status === "upcoming" && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── MultiStepFormStepPanel ────────────────────────────────────────────────

export function MultiStepFormStepPanel({ children, className }: MultiStepFormStepPanelProps) {
  // Panels are rendered by the parent based on currentStep index — this is just a slot wrapper
  return (
    <div className={cn("veloria-msf-panel w-full", className)}>
      {children}
    </div>
  );
}

// ─── MultiStepFormNav ──────────────────────────────────────────────────────

export function MultiStepFormNav({
  nextLabel = "Continue",
  backLabel = "Back",
  completeLabel = "Submit",
  className,
}: MultiStepFormNavProps) {
  const { next, back, isFirst, isLast, isValidating, progress } = useMultiStepForm();

  return (
    <div className={cn("mt-8 space-y-3", className)}>
      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-border overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={isFirst || isValidating}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            "border border-border bg-background hover:bg-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
          </svg>
          {backLabel}
        </button>

        <button
          type="button"
          onClick={next}
          disabled={isValidating}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:opacity-60 disabled:cursor-not-allowed"
          )}
        >
          {isValidating ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-8h-4M4 12H0" />
              </svg>
              Validating…
            </>
          ) : (
            <>
              {isLast ? completeLabel : nextLabel}
              {!isLast && (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
                </svg>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── MultiStepForm ─────────────────────────────────────────────────────────

export function MultiStepForm({
  steps,
  onComplete,
  stepperPosition = "top",
  children,
  className,
  defaultData = {},
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [data, setData] = React.useState<Record<string, unknown>>(defaultData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = React.useState(false);

  // Collect only MultiStepFormStepPanel children
  const panels = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type === MultiStepFormStepPanel ||
        (child.type as { displayName?: string }).displayName === "MultiStepFormStepPanel")
  );

  // The nav can live anywhere as a child — we render it separately
  const navChild = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.type === MultiStepFormNav ||
        (child.type as { displayName?: string }).displayName === "MultiStepFormNav")
  );

  const totalSteps = steps.length;
  const progress = Math.round(((currentStep) / totalSteps) * 100);
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  const setField = React.useCallback((key: string, value: unknown) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setError = React.useCallback((key: string, message: string) => {
    setErrors((prev) => ({ ...prev, [key]: message }));
  }, []);

  const clearError = React.useCallback((key: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const goTo = React.useCallback((index: number) => {
    if (index >= 0 && index < totalSteps) {
      setCurrentStep(index);
      setErrors({});
    }
  }, [totalSteps]);

  const back = React.useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setErrors({});
    }
  }, [currentStep]);

  const next = React.useCallback(async () => {
    const step = steps[currentStep];
    if (step?.validate) {
      setIsValidating(true);
      try {
        const validationErrors = await step.validate(data);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setIsValidating(false);
          return;
        }
      } catch {
        setIsValidating(false);
        return;
      }
      setIsValidating(false);
    }

    setErrors({});

    if (isLast) {
      await onComplete(data);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep, steps, data, isLast, onComplete]);

  const ctx: MultiStepFormContextValue = {
    currentStep,
    totalSteps,
    progress,
    data,
    errors,
    setField,
    setError,
    clearError,
    next,
    back,
    goTo,
    isFirst,
    isLast,
    isValidating,
  };

  const currentPanel = panels[currentStep];

  return (
    <MultiStepFormContext.Provider value={ctx}>
      <div
        className={cn(
          "veloria-multi-step-form",
          stepperPosition === "left" && "flex gap-0",
          className
        )}
      >
        {/* Stepper */}
        {stepperPosition === "top" && (
          <StepperTop steps={steps} current={currentStep} onGoTo={goTo} />
        )}
        {stepperPosition === "left" && (
          <StepperLeft steps={steps} current={currentStep} onGoTo={goTo} />
        )}

        {/* Content area */}
        <div className="flex-1 min-w-0">
          {/* Step title for left layout */}
          {stepperPosition === "left" && (
            <div className="mb-4">
              <h3 className="text-base font-semibold text-foreground">
                {steps[currentStep]?.title}
              </h3>
              {steps[currentStep]?.description && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {steps[currentStep].description}
                </p>
              )}
            </div>
          )}

          {/* Animated panel */}
          <div
            key={currentStep}
            className="animate-in fade-in-0 slide-in-from-right-4 duration-200"
          >
            {currentPanel}
          </div>

          {/* Nav (if passed as child) */}
          {navChild}
        </div>
      </div>
    </MultiStepFormContext.Provider>
  );
}

MultiStepFormStepPanel.displayName = "MultiStepFormStepPanel";
MultiStepFormNav.displayName = "MultiStepFormNav";