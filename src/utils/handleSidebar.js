window.onload = () => {
  const sidebar = document.querySelector(".fixed-sidebar");
  const collapseMenu = document.querySelector("#collapse-menu");
  const defaultLayout = document.querySelector(".default-layout");
  let isSidebarOpen = true;

  // Close sidebar
  const closeSidebar = () => {
    sidebar.style.cssText = `
            visibility: hidden;
            opacity: 0;
        `;
    defaultLayout.style.cssText = `
            display: unset;
        `;
    isSidebarOpen = false;
  };

  // Open sidebar
  const openSidebar = () => {
    sidebar.style.cssText = `
            visibility: inital;
            opacity: initial;
        `;
    defaultLayout.style.cssText = `
            display: inital;
        `;
    isSidebarOpen = true;
  };

  // Call function
  collapseMenu?.addEventListener("click", () => {
    if (isSidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
    collapseMenu.classList.toggle("rotate180");
  });
};
