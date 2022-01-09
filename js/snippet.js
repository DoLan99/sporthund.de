(function widgetScript() {
  function render() {
    const styles = document.createElement("style");
    styles.innerHTML = `
      #superchat-widget {
        width: 120px;
        height: 120px;
        max-width: calc(640px + 1px);
        position: fixed;
        right: 0;
        bottom: 0;
        
        background: transparent;
        border: 0 !important;

        -webkit-transition-property: none !important;
        -moz-transition-property: none !important;
        -o-transition-property: none !important;
        transition-property: none !important;
      }

      #superchat-widget.open {
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
      }

      #superchat-widget.greeting:not(.open) {
        width: 400px;
        height: 240px;
      }

      @media(min-width: 640px) {
        #superchat-widget {
          margin-right: 12px;
          margin-bottom: 12px;
        }

        #superchat-widget.open {
          top: auto;
          left: auto;
          height: 580px;
        }
      }
    `;
    document.body.appendChild(styles);
    const element = document.createElement("iframe");
    element.style.zIndex = "10000";
    element.id = "superchat-widget";
    element.src = `https://widget.superchat.de?applicationKey=WCWl0VQRbo5NE7v294yA6KeOwL`;
    document.body.appendChild(element);

    function handleMessage(event) {
      if (event.origin !== "https://widget.superchat.de" || event.data.type !== "controller-state-change") {
        return;
      }

      element.classList.toggle("open", event.data.details.step === "open");
      element.classList.toggle("greeting", event.data.details.step === "greeting");
    }

    window.addEventListener("message", handleMessage, false);
  }

  if (document.getElementById("superchat-widget")) {
    console.error("%c Superchat.de Webchat", "font-size: 22px");
    console.error("Snippet mehrfach geladen");
    return;
  }

  if (document.readyState === "complete") {
    render();
  } else {
    window.addEventListener("load", render);
  }
})()