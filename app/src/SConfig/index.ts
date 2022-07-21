import { SSocketProps } from 'servisofts-socket'
import { SThemeThemes } from 'servisofts-component'
const SThemeProps: SThemeThemes = {
    default: {
        barStyle: "light-content",
        barColor: "#eeeeee",
        text: "#000000",
        primary: "#eeeeee",
        secondary: "#000000",
        background: "#f0f0f0",
        card: "#CCC6C666"
    },
    dark: {
        barStyle: "light-content",
        barColor: "#000000",
        text: "#ffffff",
        primary: "#000000",
        secondary: "#ffffff",
        background: "#000000",
        card: "#44000066"
    }
}

const SocketProps: SSocketProps = {
    name: 'empresa',
    host: 'empresa.ss.lo',
    // host: '192.168.0.199',
    port: {
        native: 10029,
        web: 20029,
        http: 30029,
    },
    ssl: false,
    cert: "MIID1DCCArygAwIBAgIEYb63DjANBgkqhkiG9w0BAQsFADCBqzELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxEDAOBgNVBAsMB2VtcHJlc2ExHzAdBgNVBAMMFmVtcHJlc2Euc2Vydmlzb2Z0cy5jb20xJzAlBgkqhkiG9w0BCQEWGHJpY2t5LnBhei5kLjk3QGdtYWlsLmNvbTAeFw0yMTEyMTkwNDM3MzRaFw0yMTEyMjAwNDM3MzRaMIGrMQswCQYDVQQGEwJCTzESMBAGA1UECAwJQXYgQmFuemVyMRMwEQYDVQQHDApTYW50YSBDcnV6MRcwFQYDVQQKDA5TZXJ2aXNvZnRzIFNSTDEQMA4GA1UECwwHZW1wcmVzYTEfMB0GA1UEAwwWZW1wcmVzYS5zZXJ2aXNvZnRzLmNvbTEnMCUGCSqGSIb3DQEJARYYcmlja3kucGF6LmQuOTdAZ21haWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAstllA6Bsm9Mna5DCKtfrx2tHeu9Ecq4Fd9pvArr5nmSFH38JfiV2lJpnzjqam8kKtbM6rF8oIbJxne4+teNlOSU8zi2p9ZDsTcpYSaMb8zDtxmpC7GCkDhFbMouM+ICgMnMHu0BoHyNzQhj2FuBscN7GFyUruu0sAH51K3gO1woX1UQy8eMce2PPvkTtwXZjEZA6w9xLqDOkF7MgT7fbFlyi/CE/xk4DUaDpeuK7MY+P0wpj1o+gj9KqcXL0EHig5DR3oI6CXJUTqwylHmF93IfYdu+1u/eKBERUoeUSdxFYzuOjnxdypaxjYcYlARiG0v1v4yg9tg6ipcuUbS5QlwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBUlJw6QfkQ9927MaV11jQ9kMDnO1D5iUl9kYbIH6h2JlXxImOCI189TheXMZpSsLsvBOzTZRkZ3vZDozV0/xh6zUdO7hjgvFg+uGBWMBs8Y+g9L7WPWvXScdORIqvhdbUufN/SnmBtXvzfDaf1zjvqzqS8wmxT9H0BDQ/pc4/FCvp9k4M+IJUBaRgC95gOxZ2wTocKVHdEmcKmbbhRmaqRcRA1ViajowwdkJ02JtB5zT0kLbRypgvnobWt1VJdH338joDi/7FPoXuKlLC3st2ZPe6NtBBru+rWh8CUF1VXsmpikqQeeZRPt4axEGsrsDnx2jONW0LVd9DZvYRSSNSb",
    apis: {
        servicio:"http://servicio.ss.lo/http/"
        // rp: "http://192.168.0.21:30016/"
    }
}
export default {
    SocketProps,
    SThemeProps
}