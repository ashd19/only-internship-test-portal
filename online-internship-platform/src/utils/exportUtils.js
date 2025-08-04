// Utility functions for exporting user data

export const exportUserDataAsCSV = (userData, filename = 'user-data') => {
  try {
    // Create CSV headers
    const headers = ['ID', 'Name', 'Email', 'Attempts', 'Best Score (%)', 'Percentile', 'Status', 'Last Attempt', 'Registration Date'];
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...userData.map((user) => [
        user.id,
        `"${user.name}"`,
        `"${user.email}"`,
        user.attempts,
        user.bestScore,
        user.percentile,
        user.status,
        new Date(user.lastAttempt).toLocaleDateString(),
        new Date().toLocaleDateString() // Registration date (mock)
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: 'User data exported as CSV successfully!' };
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return { success: false, message: 'Failed to export CSV file' };
  }
};

export const exportUserDataAsJSON = (userData, filename = 'user-data') => {
  try {
    const jsonData = {
      title: 'Yuga Yatra Internship Test - User Data Export',
      generatedAt: new Date().toISOString(),
      totalUsers: userData.length,
      data: userData.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        attempts: user.attempts,
        bestScore: user.bestScore,
        percentile: user.percentile,
        status: user.status,
        lastAttempt: user.lastAttempt,
        registrationDate: new Date().toISOString() // Mock registration date
      }))
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: 'User data exported as JSON successfully!' };
  } catch (error) {
    console.error('Error exporting JSON:', error);
    return { success: false, message: 'Failed to export JSON file' };
  }
};

export const exportUserDataAsExcel = (userData, filename = 'user-data') => {
  try {
    // Create Excel-like content (tab-separated values)
    const headers = ['ID', 'Name', 'Email', 'Attempts', 'Best Score (%)', 'Percentile', 'Status', 'Last Attempt', 'Registration Date'];
    
    const excelContent = [
      headers.join('\t'),
      ...userData.map((user) => [
        user.id,
        user.name,
        user.email,
        user.attempts,
        user.bestScore,
        user.percentile,
        user.status,
        new Date(user.lastAttempt).toLocaleDateString(),
        new Date().toLocaleDateString() // Registration date (mock)
      ].join('\t'))
    ].join('\n');

    // Create and download file
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: 'User data exported as Excel successfully!' };
  } catch (error) {
    console.error('Error exporting Excel:', error);
    return { success: false, message: 'Failed to export Excel file' };
  }
};

export const generateUserDataReport = (userData) => {
  const report = {
    summary: {
      totalUsers: userData.length,
      activeUsers: userData.filter(u => u.status === 'passed').length,
      averageScore: userData.reduce((sum, user) => sum + user.bestScore, 0) / userData.length,
      topScore: Math.max(...userData.map(u => u.bestScore)),
      lowestScore: Math.min(...userData.map(u => u.bestScore)),
      generatedAt: new Date().toLocaleString()
    },
    statistics: {
      statusDistribution: {
        passed: userData.filter(u => u.status === 'passed').length,
        failed: userData.filter(u => u.status === 'failed').length
      },
      scoreRanges: {
        '90-100': userData.filter(u => u.bestScore >= 90).length,
        '80-89': userData.filter(u => u.bestScore >= 80 && u.bestScore < 90).length,
        '70-79': userData.filter(u => u.bestScore >= 70 && u.bestScore < 80).length,
        '60-69': userData.filter(u => u.bestScore >= 60 && u.bestScore < 70).length,
        'Below 60': userData.filter(u => u.bestScore < 60).length
      }
    }
  };
  
  return report;
}; 