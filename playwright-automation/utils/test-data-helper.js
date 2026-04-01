const testData = require('../fixtures/test-data.json');
const usersData = require('../fixtures/users.json');

function getTestData(module, type) {
  const moduleData = testData[module];
  if (!moduleData) {
    throw new Error(`No test data found for module: ${module}`);
  }
  if (type !== undefined && moduleData[type] !== undefined) {
    return moduleData[type];
  }
  return moduleData;
}

function getRandomProduct() {
  const keywords = testData.products.searchKeywords;
  return keywords[Math.floor(Math.random() * keywords.length)];
}

function getValidUser() {
  const customers = usersData.users.filter((u) => u.role === 'customer');
  return customers[0];
}

function getInvalidUser() {
  const invalid = usersData.invalidUsers;
  return invalid[Math.floor(Math.random() * invalid.length)];
}

function getAdminUser() {
  return usersData.users.find((u) => u.role === 'admin');
}

function getUserByEmail(email) {
  return usersData.users.find((u) => u.email === email);
}

function getCheckoutData() {
  return {
    address: testData.checkout.shippingAddress.valid,
    payment: testData.checkout.paymentMethods.creditCard,
  };
}

module.exports = {
  getTestData,
  getRandomProduct,
  getValidUser,
  getInvalidUser,
  getAdminUser,
  getUserByEmail,
  getCheckoutData,
};
