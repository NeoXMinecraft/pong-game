radio.onReceivedNumber(function (receivedNumber) {
    if (start == 0) {
        start = 1
        for (let index = 0; index < 10; index++) {
            radio.sendNumber(0)
            basic.pause(100)
        }
    }
})
input.onButtonPressed(Button.A, function () {
    if (end == 0) {
        if (OP != 0) {
            if (4 > y) {
                y += 1
            } else {
                y = 0
            }
            draw_frame()
            Send_Data(P, by, bx, y)
        }
    }
})
function clear () {
    led.unplot(0, 0)
    led.unplot(1, 0)
    led.unplot(2, 0)
    led.unplot(3, 0)
    led.unplot(4, 0)
    led.unplot(0, 1)
    led.unplot(1, 1)
    led.unplot(2, 1)
    led.unplot(3, 1)
    led.unplot(4, 1)
    led.unplot(0, 2)
    led.unplot(1, 2)
    led.unplot(2, 2)
    led.unplot(3, 2)
    led.unplot(4, 2)
    led.unplot(0, 3)
    led.unplot(1, 3)
    led.unplot(2, 3)
    led.unplot(3, 3)
    led.unplot(4, 3)
    led.unplot(0, 4)
    led.unplot(1, 4)
    led.unplot(2, 4)
    led.unplot(3, 4)
    led.unplot(4, 4)
}
function Send_Data (OP: number, by: number, bx: number, oy: number) {
    radio.sendValue("OP", OP)
    radio.sendValue("bx", bx)
    radio.sendValue("by", by)
    radio.sendValue("oy", oy)
}
radio.onReceivedString(function (receivedString) {
    full = 1
})
input.onButtonPressed(Button.B, function () {
    if (end == 0) {
        if (start == 0) {
            started = P
            by = y
            if (OP == 2) {
                bx = 3
            } else {
                bx = 1
            }
            draw_frame()
            Send_Data(P, by, bx, y)
            while (start == 0) {
                radio.sendNumber(0)
            }
        }
    }
})
function draw_frame () {
    clear()
    if (OP == 2) {
        led.plot(0, oy)
        led.plot(4, y)
    } else {
        if (OP == 1) {
            led.plot(4, oy)
            led.plot(0, y)
        }
    }
    led.plot(bx, by)
}
radio.onReceivedValue(function (name, value) {
    if (end == 0) {
        if (name == "OP") {
            OP = value
            if (OP == 1) {
                P = 2
                radio.sendValue("OP", 2)
            } else {
                P = 1
            }
        } else {
            if (name == "bx") {
                bx = value
                draw_frame()
            } else {
                if (name == "by") {
                    by = value
                    draw_frame()
                } else {
                    if (name == "oy") {
                        oy = value
                        draw_frame()
                    } else {
                        if (name == "e") {
                            OP = 0
                            draw_frame()
                        }
                    }
                }
            }
        }
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (end == 0) {
        if (OP != 0) {
            end = 1
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            radio.sendValue("e", 1)
            basic.pause(1000)
            b = 255
            for (let index = 0; index < 256; index++) {
                basic.pause(10)
                led.plotBrightness(2, 2, b)
                b += -1
            }
            b = 255
            for (let index = 0; index < 256; index++) {
                basic.pause(10)
                led.plotBrightness(1, 1, b)
                led.plotBrightness(2, 1, b)
                led.plotBrightness(3, 1, b)
                led.plotBrightness(1, 2, b)
                led.plotBrightness(1, 3, b)
                led.plotBrightness(2, 3, b)
                led.plotBrightness(3, 3, b)
                led.plotBrightness(3, 2, b)
                led.plotBrightness(3, 1, b)
                b += -1
            }
            b = 255
            for (let index = 0; index < 256; index++) {
                basic.pause(10)
                led.plotBrightness(0, 0, b)
                led.plotBrightness(1, 0, b)
                led.plotBrightness(2, 0, b)
                led.plotBrightness(3, 0, b)
                led.plotBrightness(4, 0, b)
                led.plotBrightness(4, 1, b)
                led.plotBrightness(4, 2, b)
                led.plotBrightness(4, 3, b)
                led.plotBrightness(4, 4, b)
                led.plotBrightness(3, 4, b)
                led.plotBrightness(2, 4, b)
                led.plotBrightness(1, 4, b)
                led.plotBrightness(0, 4, b)
                led.plotBrightness(0, 3, b)
                led.plotBrightness(0, 2, b)
                led.plotBrightness(0, 1, b)
                b += -1
            }
        }
    }
})
let b = 0
let oy = 0
let started = 0
let y = 0
let bx = 0
let by = 0
let OP = 0
let P = 0
let full = 0
let end = 0
let start = 0
start = 0
end = 0
full = 0
let server = 0
radio.setGroup(server)
basic.pause(1000)
if (full == 1) {
    while (full == 1) {
        full = 0
        server += 1
        radio.setGroup(server)
        basic.pause(1000)
    }
}
music.setVolume(255)
P = 0
let n = 0
let c = 0
while (OP == 0) {
    music.playTone(262, music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Half))
    c += 1
    if (10 < c) {
        P = 1
        break;
    } else {
        P = 2
        break;
    }
}
if (c < 11) {
    Send_Data(P, by, bx, y)
}
loops.everyInterval(50, function () {
    if (end == 0) {
        Send_Data(P, by, bx, y)
        draw_frame()
    }
})
basic.forever(function () {
    if (end == 0) {
        while (OP == 0) {
            Send_Data(P, by, bx, y)
        }
        if (OP == 1 && P == 2 || OP == 2 && P == 1) {
            radio.sendString("F")
        }
    }
})
loops.everyInterval(750, function () {
    if (start == 1) {
        if (started == P) {
        	
        }
    }
})
