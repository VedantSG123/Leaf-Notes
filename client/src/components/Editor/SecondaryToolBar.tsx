import { Icon, useColorMode, Button, Box } from "@chakra-ui/react"
import {
  IoMdColorPalette,
  IoMdArrowRoundBack,
  IoMdUndo,
  IoMdRedo,
} from "react-icons/io"
import { useState } from "react"
import { colors, Color } from "./Constants/Colors"
import "./picker.css"

interface properties {
  undo: () => void
  redo: () => void
  noteColor: Color
  setNoteColor: (current: Color) => void
}

function SecondaryToolBar({ undo, redo, noteColor, setNoteColor }: properties) {
  const { colorMode } = useColorMode()
  const [colorPicker, setColorPicker] = useState(false)
  const [selected, setSelected] = useState<Color>(noteColor)
  const handlePalleteClick = () => {
    setColorPicker(!colorPicker)
  }
  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} pb={2} pt={2}>
        <Box>
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={IoMdArrowRoundBack} boxSize={6} />}
            size={"md"}
          />
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={IoMdUndo} boxSize={6} />}
            onClick={undo}
            size={"md"}
          />
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={IoMdRedo} boxSize={6} />}
            onClick={redo}
            size={"md"}
          />
        </Box>
        <Box>
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={IoMdColorPalette} boxSize={6} />}
            size={"md"}
            onClick={handlePalleteClick}
          />
          <div
            className={`color-menu ${!colorPicker && "color-menu-inactive"}`}
            style={{ backgroundColor: colorMode === "light" ? "#fff" : "#000" }}
          >
            {colors.map((color, index) => {
              const handleColor = () => {
                setSelected(color)
                setNoteColor(color)
              }
              return (
                <div
                  className={
                    selected.light === color.light ? "selected-color" : ""
                  }
                  style={{
                    backgroundColor:
                      colorMode === "light" ? color.light : color.dark,
                  }}
                  key={index}
                  onClick={handleColor}
                ></div>
              )
            })}
          </div>
        </Box>
      </Box>
    </>
  )
}

export default SecondaryToolBar
