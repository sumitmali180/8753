import React from "react";
import { jsPDF } from "jspdf";

const ProductivityReport = ({ reportData }) => {
  const generatePDF = () => {
   
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Weekly Productivity Report", 10, 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Total Tasks Completed: ${reportData.totalTasks}`, 10, 30);
    doc.text(`Total Time Spent: ${reportData.totalTime} hours`, 10, 40);
    doc.text(`Average Task Duration: ${reportData.avgDuration} hours`, 10, 50);

    doc.text("\n", 10, 60);

    doc.setFont("helvetica", "italic");
    doc.text("This report provides an overview of your team's productivity for the week.", 10, 70);

    doc.save("weekly_report.pdf");
  };

  return (
    <div className="mt-8">
      <button
        onClick={generatePDF}
        className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
      >
        Generate Weekly Report
      </button>
    </div>
  );
};

export default ProductivityReport;
