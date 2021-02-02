export const getError = code => {
  switch (code) {
    case 401:
      return {
        header: "Ошибка авторизации",
        body:
          "Необходимо попробовать авторизоваться еще раз, заполнив поля логин и пароль заново. Проверьте правильность данных еще раз. Это и должно решить вашу проблему. Если ошибка никуда не исчезла, вам нужно написать администрации ресурса, на который вас не пускают."
      };
    case 500:
      return {
        header: "Внутренняя ошибка сервера",
        body: "Вам нужно написать администрации ресурса"
      };
    default:
      return {
        header: "Ресурс не найден",
        body: "Что-то пошло не так... Нет данных"
      };
  }
};

export const getParameterFromUrl = param => {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var vars: string = url.searchParams.get(param);
  return vars;
};
