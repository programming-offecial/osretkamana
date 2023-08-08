document.addEventListener('DOMContentLoaded', function() {
    var calculateBtn = document.getElementById('calculate-btn');
    var startOverBtn = document.getElementById('start-over-btn');
    var resultDiv = document.getElementById('result');
    var calendarDiv = document.getElementById('calendar');
  
    function updateCalendar(ovulationDate, fertileDaysStart, fertileDaysEnd) {
      var calendarHtml = '<table><tr>';
      for (var i = 0; i < 7; i++) {
        calendarHtml += '<th>' + ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][i] + '</th>';
      }
      calendarHtml += '</tr><tr>';
      var startDate = new Date(ovulationDate.getTime() - (10 * 24 * 60 * 60 * 1000));
      for (var i = 0; i < 42; i++) {
        if (i % 7 === 0 && i !== 0) {
          calendarHtml += '</tr><tr>';
        }
        var currentDate = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
        var cellClass = '';
        if (currentDate >= fertileDaysStart && currentDate <= fertileDaysEnd) {
          cellClass = 'fertile-day';
        }
        if (currentDate.getTime() === ovulationDate.getTime()) {
          cellClass = 'ovulation-day';
        }
        calendarHtml += '<td class="' + cellClass + '">' + currentDate.getDate() + '</td>';
      }
      calendarHtml += '</tr></table>';
  
      calendarDiv.innerHTML = calendarHtml;
    }
  
    calculateBtn.addEventListener('click', function() {
      var lastPeriodDate = new Date(document.getElementById('last-period').value);
      var cycleLength = parseInt(document.getElementById('cycle-length').value);
  
      if (!isNaN(cycleLength)) {
        var ovulationDate = new Date(lastPeriodDate.getTime() + (cycleLength * 24 * 60 * 60 * 1000));
  
        var fertileDaysStart = new Date(ovulationDate.getTime() - (4 * 24 * 60 * 60 * 1000));
        var fertileDaysEnd = new Date(ovulationDate.getTime() + (3 * 24 * 60 * 60 * 1000));
  
        var newCycleStart = new Date(ovulationDate.getTime() + (cycleLength * 24 * 60 * 60 * 1000));
  
        resultDiv.innerHTML = `
          <div class="result">
            <p>تاريخ التبويض المتوقع: ${ovulationDate.toDateString()}</p>
            <p>بداية أيام الخصوبة: ${fertileDaysStart.toDateString()}</p>
            <p>نهاية أيام الخصوبة: ${fertileDaysEnd.toDateString()}</p>
            <p>بداية دورة جديدة: ${newCycleStart.toDateString()}</p>
          </div>
        `;
  
        updateCalendar(ovulationDate, fertileDaysStart, fertileDaysEnd);
  
        startOverBtn.style.display = 'block';
      } else {
        resultDiv.innerHTML = '<p class="error">الرجاء إدخال طول دورة صالح.</p>';
        calendarDiv.innerHTML = '';
        startOverBtn.style.display = 'none';
      }
    });
  
    startOverBtn.addEventListener('click', function() {
      document.getElementById('last-period').value = '';
      document.getElementById('cycle-length').value = '';
      resultDiv.innerHTML = '';
      calendarDiv.innerHTML = '';
      startOverBtn.style.display = 'none';
    });
  });