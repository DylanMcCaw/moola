function calculateDueDate(startDate) {
    const start = new Date(startDate);
    let dueDate = new Date(start);
    
    // Set the due date to the next month
    dueDate.setMonth(dueDate.getMonth() + 1);
    
    // If the due date has passed, move it to the next month
    const today = new Date();
    while (dueDate < today) {
      dueDate.setMonth(dueDate.getMonth() + 1);
    }
    
    return dueDate;
  }

  export default calculateDueDate;