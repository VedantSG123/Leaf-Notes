import formats, { formatType } from "./Constants/ToolbarOptions"
import { useColorMode, Box } from "@chakra-ui/react"

const renderOptions = (formatData: formatType, key: number) => {
  if (!formatData.options) return
  const { className, options } = formatData
  return (
    <select className={className} key={key}>
      <option selected={true}></option>
      {options.map((value, index) => {
        return <option value={value} key={index}></option>
      })}
    </select>
  )
}
const renderSingle = (formatData: formatType, key: number) => {
  const { className, value } = formatData
  return <button className={className} value={value} key={key}></button>
}

function CustomToolbar() {
  const { colorMode } = useColorMode()

  return (
    <Box
      className={`tool-bar-container`}
      style={{
        backgroundColor: colorMode === "light" ? "#B9FED5" : "#03C988",
      }}
    >
      <div className="leaf-tool-bar">
        <span className="ql-formats">
          {formats.map((format, index) => {
            return format.options
              ? renderOptions(format, index)
              : renderSingle(format, index)
          })}
        </span>
      </div>
    </Box>
  )
}

export default CustomToolbar
