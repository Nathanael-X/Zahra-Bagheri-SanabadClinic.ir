document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('progressContainer');

  const bar = new ProgressBar.Line(container, {
    strokeWidth: 6,
    color: '#28b6f6',
    trailColor: '#e0e0e0',
    trailWidth: 6,
    duration: 2500,
    easing: 'easeInOut',
    text: {
      style: {
        position: 'absolute',
        top: '80%',
        transform: 'translate(-50%, -50%)',
        color: '#1f232c',
        fontWeight: 'bold',
        fontSize: '20px',
        whiteSpace: 'nowrap'
      },
      autoStyleContainer: false
    },
    step: function (state, barInstance) {
      const value = Math.round(barInstance.value() * 100);
      barInstance.setText(value + ' %');

      const containerWidth = container.offsetWidth;
      const textElement = barInstance.text;
      const left = containerWidth * barInstance.value();

      textElement.style.left = `${left}px`;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bar.animate(0.75); // تا ۸۰٪
      observer.disconnect(); // فقط یک‌بار اجرا شود
    }
  }, { threshold: 0.6 });

  observer.observe(container);

  const container_2 = document.getElementById('progressContainer_2');

  const bar_2 = new ProgressBar.Line(container_2, {
    strokeWidth: 6,
    color: '#28b6f6',
    trailColor: '#e0e0e0',
    trailWidth: 6,
    duration: 2500,
    easing: 'easeInOut',
    text: {
      style: {
        position: 'absolute',
        top: '80%',
        transform: 'translate(-50%, -50%)',
        color: '#1f232c',
        fontWeight: 'bold',
        fontSize: '20px',
        whiteSpace: 'nowrap'
      },
      autoStyleContainer: false
    },
    step: function (state, barInstance) {
      const value = Math.round(barInstance.value() * 100);
      barInstance.setText(value + ' %');

      const containerWidth = container_2.offsetWidth;
      const textElement = barInstance.text;
      const left = containerWidth * barInstance.value();

      textElement.style.left = `${left}px`;
    }
  });

  const observer_2 = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bar_2.animate(0.95); // تا 95
      observer_2.disconnect(); // فقط یک‌بار اجرا شود
    }
  }, { threshold: 0.6 });

  observer_2.observe(container_2);

  const container_3 = document.getElementById('progressContainer_3');

  const bar_3 = new ProgressBar.Line(container_3, {
    strokeWidth: 6,
    color: '#28b6f6',
    trailColor: '#e0e0e0',
    trailWidth: 6,
    duration: 2500,
    easing: 'easeInOut',
    text: {
      style: {
        position: 'absolute',
        top: '80%',
        transform: 'translate(-50%, -50%)',
        color: '#1f232c',
        fontWeight: 'bold',
        fontSize: '20px',
        whiteSpace: 'nowrap'
      },
      autoStyleContainer: false
    },
    step: function (state, barInstance) {
      const value = Math.round(barInstance.value() * 100);
      barInstance.setText(value + ' %');

      const containerWidth = container_3.offsetWidth;
      const textElement = barInstance.text;
      const left = containerWidth * barInstance.value();

      textElement.style.left = `${left}px`;
    }
  });

  const observer_3 = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bar_3.animate(0.6); // تا 60
      observer_3.disconnect(); // فقط یک‌بار اجرا شود
    }
  }, { threshold: 0.6 });

  observer_3.observe(container_3);
});
