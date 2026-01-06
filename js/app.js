  const tg = Telegram.WebApp;
  tg.expand();

  let lightOn = false;

  function log(msg) {
    const el = document.getElementById("log");
    el.innerText = (el.innerText === "—" ? "" : el.innerText + "\n") + msg;
  }

  function addHistory(msg) {
    const el = document.getElementById("history");
    el.innerText = (el.innerText === "—" ? "" : el.innerText + "\n") + msg;
  }

  function addError(msg) {
    const el = document.getElementById("errors");
    el.innerText = (el.innerText.includes("Nessun") ? "" : el.innerText + "\n") + msg;
  }


  function setAlarm(mode) {
    const statusEl = document.getElementById("alarmStatus");

    // reset pulsanti
    document.getElementById("btn-attivo").classList.remove("active");
    document.getElementById("btn-notte").classList.remove("active");
    document.getElementById("btn-disattivo").classList.remove("active");

    if (mode === "ATTIVO") {
      statusEl.innerText = "ATTIVO";
      statusEl.className = "status on";
      document.getElementById("btn-attivo").classList.add("active");
      tg.HapticFeedback?.notificationOccurred("success");
    }

    if (mode === "NOTTE") {
      statusEl.innerText = "NOTTE";
      statusEl.className = "status on";
      document.getElementById("btn-notte").classList.add("active");
      tg.HapticFeedback?.notificationOccurred("success");
    }

    if (mode === "DISATTIVO") {
      statusEl.innerText = "DISATTIVO";
      statusEl.className = "status off";
      document.getElementById("btn-disattivo").classList.add("active");
      tg.HapticFeedback?.notificationOccurred("warning");
    }

    addHistory("Allarme → " + mode);
    log("Preset selezionato: " + mode);
  }

  function toggleLight() {
    const el = document.getElementById("lightCucina");
    lightOn = !lightOn;
    el.classList.toggle("on", lightOn);

    log("Luce cucina: " + (lightOn ? "ON" : "OFF"));
    tg.HapticFeedback?.impactOccurred("light");
  }



  function setDoorState(sensorId, isClosed) {
    const el = document.getElementById("sensor-" + sensorId);
    if (!el) return;

    if (isClosed) {
      el.innerText = "CHIUSA";
      el.className = "status on";
      log("Sensore " + sensorId + ": CHIUSA");
    } else {
      el.innerText = "APERTA";
      el.className = "status off";
      log("Sensore " + sensorId + ": APERTA");
      tg.HapticFeedback?.notificationOccurred("warning");
    }
  }

  // simulazione (puoi rimuoverla)
  // setTimeout(() => setDoorState("ingresso", false), 4000);
