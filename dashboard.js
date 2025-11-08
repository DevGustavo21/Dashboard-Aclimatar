document.addEventListener("DOMContentLoaded", function () {
  const dropdownTrigger = document.querySelector(".dashboard__mobile-title");
  const dropdown = document.querySelector(".dashboard__mobile-dropdown");

  if (dropdownTrigger && dropdown) {
    dropdownTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("active-dropdown");
    });

    // Cerrar dropdown al hacer click fuera del contenedor
    document.addEventListener("click", function (e) {
      const isClickInsideDropdown = dropdown.contains(e.target);
      const isClickOnTrigger = dropdownTrigger.contains(e.target);

      if (!isClickInsideDropdown && !isClickOnTrigger) {
        dropdown.classList.remove("active-dropdown");
      }
    });
  }

  const desktopTabButtons = document.querySelectorAll(".dashboard__tab-btn");
  const desktopTabContents = document.querySelectorAll(
    ".dashboard__tab-content"
  );

  const mobileTabButtons = document.querySelectorAll(".mobile-tab-button");
  const mobileTabContents = document.querySelectorAll(".mobile-tab-content");

  function switchDesktopTab(targetTab) {
    desktopTabContents.forEach((content) => {
      content.classList.remove("active");
      content.style.display = "none";
    });

    desktopTabButtons.forEach((button) => {
      button.classList.remove("active-tab");
    });

    const activeContent = document.querySelector(
      `[data-content="${targetTab}"]`
    );
    if (activeContent) {
      activeContent.classList.add("active");
      activeContent.style.display = "flex";
    }

    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    if (activeButton) {
      activeButton.classList.add("active-tab");
    }
  }

  function switchMobileTab(targetTab) {
    const clickedButton = document.querySelector(
      `[data-mobile-tab="${targetTab}"]`
    );
    const clickedContent = document.querySelector(
      `[data-mobile-content="${targetTab}"]`
    );

    if (!clickedButton || !clickedContent) return;

    if (clickedButton.classList.contains("active")) {
      clickedButton.classList.remove("active");
      clickedContent.classList.remove("active");
      clickedContent.style.display = "none";
      return;
    }

    mobileTabContents.forEach((content) => {
      content.classList.remove("active");
      content.style.display = "none";
    });

    mobileTabButtons.forEach((button) => {
      button.classList.remove("active");
    });

    clickedButton.classList.add("active");
    clickedContent.classList.add("active");
    clickedContent.style.display = "flex";
  }

  desktopTabButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const targetTab = this.getAttribute("data-tab");
      switchDesktopTab(targetTab);
    });
  });

  mobileTabButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const targetTab = this.getAttribute("data-mobile-tab");
      switchMobileTab(targetTab);
    });
  });

  if (desktopTabButtons.length > 0) {
    const firstDesktopTab = desktopTabButtons[0].getAttribute("data-tab");
    switchDesktopTab(firstDesktopTab);
  }

  const saveIcons = document.querySelectorAll("[data-save-icon]");

  saveIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      this.classList.toggle("saved");

      if (this.classList.contains("save-icon-blue")) {
        if (this.classList.contains("saved")) {
          this.src = "assets/icons/save-icon-blue-filled.svg";
        } else {
          this.src = "assets/icons/save-icon-blue.svg";
        }
      } else {
        if (this.classList.contains("saved")) {
          this.src = "assets/icons/save-icon-filled.svg";
        } else {
          this.src = "assets/icons/save-icon.svg";
        }
      }
    });
  });
});
