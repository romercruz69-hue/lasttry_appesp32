export interface AuthRequestPayload { userId: string; email: string; }
export interface DeviceCommand { action: string; pin?: number; value: boolean | number | string; }
