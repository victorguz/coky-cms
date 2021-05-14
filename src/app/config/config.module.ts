/**
 * Clase con las configuraciones iniciales del framework
 */
export class Config {

  public static readonly appName: string = "Coky framework";
  public static readonly appVersion: string = "1.0";
  public static readonly owner: string = "Victorguz";
  public static readonly developer: string = "Victorguz";
  public static readonly developerLink: string = "https://github.com/victorguz";

  public static readonly emailConf = {
    username: "holalelo@gmail.com",
    password: "123456",
    host: "mail.gmail.com",
    protocol: "TLS",
    port: 587,
    replyTo: "reply@gmail.com",
  };

  public static readonly detaultStyles = [
    {
      name: "navbar-color",
      value: "#fffff"
    },
    {
      name: "sidebar-color",
      value: "#fffff"
    },
  ]
}

