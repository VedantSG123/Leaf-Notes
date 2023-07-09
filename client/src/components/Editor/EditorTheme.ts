const setToolbarTheme = (toolbar: any, mode: string) => {
  toolbar.container.style.backgroundColor =
    mode === "light" ? "#B9FED5" : "#03C988"
  const pickers = toolbar.container.querySelectorAll(".ql-picker-options")
  pickers.forEach((element: HTMLElement) => {
    element.style.backgroundColor = mode === "light" ? "#fff" : "#bec7cb"
    element.style.borderColor = mode === "light" ? "#fff" : "#bec7cb"
  })
}

export { setToolbarTheme }
