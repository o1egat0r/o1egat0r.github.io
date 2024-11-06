import 'style.css'

// Получаем все элементы с атрибутом contenteditable="true"
const editableElements = document.querySelectorAll('[contenteditable="true"]');
// Добавляем обработчик события input для каждого элемента
editableElements.forEach(element => {
  element.addEventListener('input', () => {
    // Сохраняем значение элемента
    const newValue = element.textContent;
    console.log(`Изменен элемент: ${element.tagName} - новое значение: ${newValue}`);
  });
});


document.getElementById('download-btn').addEventListener('click', () => {
  const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
  const imgWidth = 210; // Ширина страницы A4 в мм
  const imgHeight = 400; // Высота страницы A4 в мм

  const sections = ['profile', 'experience', 'education', 'languages', 'skills', 'interests'];

  let yOffset = 0;

  sections.forEach((sectionId, index) => {
    const element = document.getElementById(sectionId);

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (yOffset + imgHeight > 297) {
        pdf.addPage();
        yOffset = 0;
      }

      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
      yOffset += imgHeight;

      if (index === sections.length - 1) {
        pdf.save('resume.pdf');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const rippleElements = document.querySelectorAll('[ripple]');

  rippleElements.forEach(element => {
    element.addEventListener('click', (event) => {
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${event.clientX - rect.left - radius}px`;
      ripple.style.top = `${event.clientY - rect.top - radius}px`;
      ripple.classList.add('ripple');

      element.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

document.addEventListener('input', (event) => {
  if (event.target.getAttribute('contenteditable') === 'true') {
    localStorage.setItem(event.target.tagName + event.target.id, event.target.textContent);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const editableElements = document.querySelectorAll('[contenteditable="true"]');
  editableElements.forEach(element => {
    const savedValue = localStorage.getItem(element.tagName + element.id);
    if (savedValue) {
      element.textContent = savedValue;
    }
  });
});
