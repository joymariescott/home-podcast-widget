type AnalyticsFunction = (category: string, action: string, label: string) => void;

interface Window {
    ens_specialEvent: AnalyticsFunction;
}