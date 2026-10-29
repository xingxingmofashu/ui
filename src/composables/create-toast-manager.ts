import { Toast as UIToast } from "@base-ui/react/toast";

/**
 * Creates a toast manager for adding notifications outside the React tree.
 */
const createToastManager = UIToast.createToastManager;

export { createToastManager };
