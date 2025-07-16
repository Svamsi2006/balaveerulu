
export interface CouponValidationResult {
  isValid: boolean;
  discount: number;
  message: string;
}

export const validateCoupon = (code: string): CouponValidationResult => {
  const upperCode = code.toUpperCase();
  
  switch (upperCode) {
    case 'HARSHI10':
      return {
        isValid: true,
        discount: 0.1,
        message: "10% discount applied successfully!"
      };
    case 'SIVA100':
      return {
        isValid: true,
        discount: 0.98,
        message: "98% discount applied successfully!"
      };
    case 'GANESH95':
      return {
        isValid: true,
        discount: 0.95,
        message: "95% discount applied successfully!"
      };
    default:
      return {
        isValid: false,
        discount: 0,
        message: "Invalid coupon code. Try HARSHI10, SIVA100, or GANESH95."
      };
  }
};
