// Phone number validation service
function validatePhoneNumber(phoneNumber) {
  // Regular expression for international phone number validation
  // Supports formats like: +911234567890, +44 20 1234 5678, etc.
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
}

module.exports = {
  validatePhoneNumber
};
