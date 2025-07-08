export default (aiResult: any, excelData: any) => {
  let passed = 0;
  let failed = 0;
  let needReview = 0;
  const testResult = aiResult.map((item: any, index: number) => {
    item["Actual Result"] = aiResult[index]?.output || "No result";

    if (aiResult[index]?.output) {
      const match = aiResult[index]?.output.match(
        /(?:Result|Status|Test Case Status|Pass\/Fail Status)\s*[:\-]?\s*(Pass|Fail)/i
      );
      const status = match ? match[1] : "not found";

      excelData[index]["Actual Result"] = aiResult[index]?.output || "No result";
      excelData[index]["Status"] = status;
      if (status === "Pass") passed++;
      if (status === "Fail") failed++;
      if (status == "not found") needReview++;
    }

    return item;
  });
  return {
    testResult: excelData,
    summary: {
      total: testResult.length,
      passed,
      failed,
      needReview,
      passRate: ((passed / testResult.length) * 100).toFixed(2) + "%",
      failRate: ((failed / testResult.length) * 100).toFixed(2) + "%",
      reviewRate: ((needReview / testResult.length) * 100).toFixed(2) + "%",
    },
  };
};
