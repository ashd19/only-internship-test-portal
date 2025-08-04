// Utility functions for downloading merit list data

export const downloadMeritListAsCSV = (meritList, filename = 'merit-list') => {
  try {
    // Create CSV headers
    const headers = ['Rank', 'Name', 'Email', 'Score (%)', 'Percentile', 'Attempts', 'Date'];
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...meritList.map((candidate, index) => [
        index + 1,
        `"${candidate.name}"`,
        `"${candidate.email}"`,
        candidate.bestScore,
        candidate.percentile,
        candidate.attempts,
        new Date().toLocaleDateString()
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
    
    return { success: true, message: 'Merit list downloaded as CSV successfully!' };
  } catch (error) {
    console.error('Error downloading CSV:', error);
    return { success: false, message: 'Failed to download CSV file' };
  }
};

export const downloadMeritListAsExcel = (meritList, filename = 'merit-list') => {
  try {
    // Create Excel-like content (tab-separated values)
    const headers = ['Rank', 'Name', 'Email', 'Score (%)', 'Percentile', 'Attempts', 'Date'];
    
    const excelContent = [
      headers.join('\t'),
      ...meritList.map((candidate, index) => [
        index + 1,
        candidate.name,
        candidate.email,
        candidate.bestScore,
        candidate.percentile,
        candidate.attempts,
        new Date().toLocaleDateString()
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
    
    return { success: true, message: 'Merit list downloaded as Excel successfully!' };
  } catch (error) {
    console.error('Error downloading Excel:', error);
    return { success: false, message: 'Failed to download Excel file' };
  }
};

export const downloadMeritListAsJSON = (meritList, filename = 'merit-list') => {
  try {
    const jsonData = {
      title: 'Yuga Yatra Internship Test - Merit List',
      generatedAt: new Date().toISOString(),
      totalCandidates: meritList.length,
      data: meritList.map((candidate, index) => ({
        rank: index + 1,
        name: candidate.name,
        email: candidate.email,
        score: candidate.bestScore,
        percentile: candidate.percentile,
        attempts: candidate.attempts
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
    
    return { success: true, message: 'Merit list downloaded as JSON successfully!' };
  } catch (error) {
    console.error('Error downloading JSON:', error);
    return { success: false, message: 'Failed to download JSON file' };
  }
};

export const generateMeritListReport = (meritList) => {
  const report = {
    summary: {
      totalCandidates: meritList.length,
      averageScore: meritList.reduce((sum, candidate) => sum + candidate.bestScore, 0) / meritList.length,
      topScore: Math.max(...meritList.map(c => c.bestScore)),
      lowestScore: Math.min(...meritList.map(c => c.bestScore)),
      generatedAt: new Date().toLocaleString()
    },
    topPerformers: meritList.slice(0, 10),
    statistics: {
      scoreRanges: {
        '90-100': meritList.filter(c => c.bestScore >= 90).length,
        '80-89': meritList.filter(c => c.bestScore >= 80 && c.bestScore < 90).length,
        '70-79': meritList.filter(c => c.bestScore >= 70 && c.bestScore < 80).length,
        '60-69': meritList.filter(c => c.bestScore >= 60 && c.bestScore < 70).length,
        'Below 60': meritList.filter(c => c.bestScore < 60).length
      }
    }
  };
  
  return report;
}; 