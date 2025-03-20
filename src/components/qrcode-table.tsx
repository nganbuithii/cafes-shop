'use client'
import { getTableLink } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export default function QRCodeTable({
  
  tableNumber,
  width = 250
}: {
  // token: string
  tableNumber: number
  width?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    // Hiện tại: Thư viện QRCode nó sẽ vẽ lên cái thẻ Canvas
    // Bây giờ: Chúng ta sẽ tạo 1 cái thẻ canvas ảo để thư viện QRCode code nó vẽ QR lên trên đó.
    // Và chúng ta sẽ edit thẻ canvas thật
    // Cuối cùng thì chúng ta sẽ đưa cái thẻ canvas ảo chứa QR Code ở trên vào thẻ Canvas thật
    const canvas = canvasRef.current!
    canvas.height = width + 70
    canvas.width = width
    const canvasContext = canvas.getContext('2d')!
    canvasContext.fillStyle = '#fff'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    canvasContext.font = '20px Arial'
    canvasContext.textAlign = 'center'
    canvasContext.fillStyle = '#000'
    canvasContext.fillText(
      `Table number ${tableNumber}`,
      canvas.width / 2,
      canvas.width + 20
    )
    canvasContext.fillText(
      `Scan QR code to order`,
      canvas.width / 2,
      canvas.width + 50
    )
    const virtalCanvas = document.createElement('canvas')
    QRCode.toCanvas(
      virtalCanvas,
      getTableLink({
        // token,
        tableNumber
      }),
      {
        width,
        margin: 4
      },
      function (error:unknown) {
        if (error) console.error(error)
        canvasContext.drawImage(virtalCanvas, 0, 0, width, width)
      }
    )
  }, [ width, tableNumber])
  return <canvas ref={canvasRef} />
}
