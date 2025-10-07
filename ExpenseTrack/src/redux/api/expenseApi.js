const API_BASE_URL = 'http://localhost:3001';

export const expenseApi = {
  fetchExpenses: async () => {
    const response = await fetch(`${API_BASE_URL}/expenses`);
    if (!response.ok) throw new Error('Failed to fetch expenses');
    return response.json();
  },

  addExpense: async (expense) => {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense)
    });
    if (!response.ok) throw new Error('Failed to add expense');
    return response.json();
  },

  updateExpense: async (expense) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${expense.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense)
    });
    if (!response.ok) throw new Error('Failed to update expense');
    return response.json();
  },

  deleteExpense: async (id) => {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete expense');
    return id;
  }
};