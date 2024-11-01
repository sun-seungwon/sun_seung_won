input.onButtonPressed(Button.A, function () {
    OLED.clear()
})
let vol = 0
let tem = 0
pins.analogWritePin(AnalogPin.P1, 0)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
let item = neopixel.create(DigitalPin.P16, 8, NeoPixelMode.RGB)
item.showRainbow(1, 360)
OLED.init(128, 64)
basic.forever(function () {
    item.show()
})
// 흙에 수분이 없을 경우 물을 달라는 문구를 OLED에 표시
basic.forever(function () {
    basic.showNumber(pins.analogReadPin(AnalogReadWritePin.P3))
    if (pins.analogReadPin(AnalogReadWritePin.P3) < 300) {
        OLED.writeStringNewLine("\"water please\"")
    }
})
// 만약 식물 주변의 온도가 화씨 68도(섭씨 20도)를 넘으면 모터(선풍기)가 작동한다.
basic.forever(function () {
    if (tem <= 68) {
        pins.analogWritePin(AnalogPin.P1, 512)
    } else {
        pins.analogWritePin(AnalogPin.P1, 0)
    }
})
// 외장센서인 온도계가 읽는 값과 화씨로 변환
basic.forever(function () {
    vol = pins.map(
    pins.analogReadPin(AnalogReadWritePin.P4),
    0,
    1023,
    0,
    3300
    )
    tem = (vol - 500) / 10
})
