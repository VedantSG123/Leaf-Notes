import { Icon, useColorMode, Button, Box } from "@chakra-ui/react"
import {
  IoMdColorPalette,
  IoMdArrowRoundBack,
  IoMdUndo,
  IoMdRedo,
} from "react-icons/io"
import { useState, useEffect } from "react"
import { colors, Color } from "./Constants/Colors"
import "./picker.css"

interface properties {
  undo: () => void
  redo: () => void
  back: () => void
  noteColor: Color
  setNoteColor: (current: Color) => void
}

function SecondaryToolBar({
  undo,
  redo,
  noteColor,
  setNoteColor,
  back,
}: properties) {
  const { colorMode } = useColorMode()
  const [colorPicker, setColorPicker] = useState(false)
  const [selected, setSelected] = useState<Color>()
  const handlePalleteClick = () => {
    setColorPicker(!colorPicker)
  }
  const handleColor = (color: Color) => {
    setSelected(color)
    setNoteColor(color)
  }

  useEffect(() => {
    setSelected(noteColor)
  }, [noteColor])
  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} pb={2} pt={2}>
        <Box>
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={IoMdArrowRoundBack} boxSize={5} />}
            onClick={back}
          />
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={IoMdUndo} boxSize={5} />}
            onClick={undo}
          />
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={IoMdRedo} boxSize={5} />}
            onClick={redo}
          />
        </Box>
        <Box position={"relative"}>
          <Button
            variant={"ghost"}
            leftIcon={<Icon as={IoMdColorPalette} boxSize={5} />}
            onClick={handlePalleteClick}
          />
          <div
            className={`color-menu ${!colorPicker && "color-menu-inactive"}`}
            style={{ backgroundColor: colorMode === "light" ? "#fff" : "#000" }}
          >
            {colors.map((color, index) => {
              return (
                <div
                  className={
                    selected
                      ? selected.light === color.light
                        ? "selected-color"
                        : ""
                      : ""
                  }
                  style={{
                    backgroundColor:
                      colorMode === "light" ? color.light : color.dark,
                  }}
                  key={index}
                  onClick={() => handleColor(color)}
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
