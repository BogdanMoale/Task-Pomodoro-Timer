class PomodoroTimer {
    constructor(workDuration, breakDuration) {
      this.workDuration = workDuration;
      this.breakDuration = breakDuration;
      this.isWorking = true;
      this.isRunning = false;
      this.timerInterval = null;
      this.display = document.getElementById('timer');
      this.startButton = document.getElementById('startButton');
      this.resetButton = document.getElementById('resetButton');
  
      this.updateDisplay();
      this.bindEventListeners();
    }
  
    bindEventListeners() {
      this.startButton.addEventListener('click', () => this.toggleTimer());
      this.resetButton.addEventListener('click', () => this.resetTimer());
    }
  
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.timerInterval);
      } else {
        this.timerInterval = setInterval(() => this.updateTime(), 1000);
      }
      this.isRunning = !this.isRunning;
      this.startButton.textContent = this.isRunning ? 'Pause' : 'Resume';
    }
  
    resetTimer() {
      clearInterval(this.timerInterval);
      this.isRunning = false;
      this.isWorking = true;
      this.startButton.textContent = 'Start';
      this.workDuration = 25 * 60; // Reset work duration to 25 minutes
      this.breakDuration = 5 * 60; // Reset break duration to 5 minutes
      this.updateDisplay();
    }
  
    updateTime() {
      if (this.isWorking) {
        this.workDuration--;
      } else {
        this.breakDuration--;
      }
      this.updateDisplay();

       // Update timer label
        this.setTimerLabel();
  
      if (this.workDuration === 0 && this.isWorking) {
        this.isWorking = false;
        this.workDuration = 25 * 60; // Reset work duration to 25 minutes
        this.breakDuration = 5 * 60; // Reset break duration to 5 minutes
        this.notify('Time for a break!');
      } else if (this.breakDuration === 0 && !this.isWorking) {
        this.isWorking = true;
        this.workDuration = 25 * 60; // Reset work duration to 25 minutes
        this.breakDuration = 5 * 60; // Reset break duration to 5 minutes
        this.notify('Back to work!');
      }
    }

    setTimerLabel() {
        const timerLabel = document.getElementById('timerLabel');
        timerLabel.textContent = this.isWorking ? 'Work' : 'Break';
      }
  
    updateDisplay() {
      const minutes = Math.floor(this.isWorking ? this.workDuration / 60 : this.breakDuration / 60);
      const seconds = this.isWorking ? this.workDuration % 60 : this.breakDuration % 60;
      this.display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    notify(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        const notificationOverlay = document.querySelector('.notification-overlay');
        const notificationSound = document.getElementById('notificationSound');
    
        notificationText.textContent = message;
        notification.classList.add('show');
        notificationOverlay.classList.add('show');
        notificationSound.play(); // Play the notification sound
    
        // Create and append the OK button
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.addEventListener('click', () => this.hideNotification());
        notification.appendChild(okButton);
      }
    hideNotification() {
      const notification = document.getElementById('notification');
      const notificationOverlay = document.querySelector('.notification-overlay');
  
      notification.classList.remove('show');
      notificationOverlay.classList.remove('show');
  
      // Remove the OK button
      const okButton = notification.querySelector('button');
      if (okButton) {
        okButton.remove();
      }
    }
  }
  
  // Initialize Pomodoro Timer with work and break durations
  const pomodoroTimer = new PomodoroTimer(25 * 60, 5 * 60);
  