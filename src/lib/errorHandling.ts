import { useToast } from 'vue-toast-notification'

export interface AppError {
  message: string
  code?: string
  details?: unknown
}

export class AppErrorHandler {
  private static toast = useToast()

  static handleError(error: AppError | Error | unknown, context?: string): void {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error)

    let message = 'An unexpected error occurred'

    if (error instanceof Error) {
      message = error.message
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      message = String((error as AppError).message)
    } else if (typeof error === 'string') {
      message = error
    }

    this.toast.error(message)
  }

  static handleSuccess(message: string): void {
    this.toast.success(message)
  }

  static handleWarning(message: string): void {
    this.toast.warning(message)
  }

  static handleInfo(message: string): void {
    this.toast.info(message)
  }
}

export const ErrorMessages = {
  ELEMENT_CREATE_FAILED: 'Failed to create new element',
  ELEMENT_UPDATE_FAILED: 'Failed to update element',
  ELEMENT_DELETE_FAILED: 'Failed to delete element',
  DESIGN_SAVE_FAILED: 'Failed to save design',
  DESIGN_LOAD_FAILED: 'Failed to load design',
  DESIGN_RESET_FAILED: 'Failed to reset design',
  CANVAS_INTERACTION_FAILED: 'Canvas interaction failed',
} as const
