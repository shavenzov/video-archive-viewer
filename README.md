# Video Archive Viewer

По адресу http://root:root@try.axxonsoft.com:8000/asip-api доступен HTTP API сервера видеонаблюдения. Сервер получает видео с нескольких видеокамер, сохраняет его в архив. Требуется разработать Web-приложение, отображающее содержимой архива видеокамеры в виде временной шкалы из набора кадров:

![Video archive viewer ui sketch](https://shavenzov.github.io/video-archive-viewer/assets/screenshot.jpg)

- Кадры выводятся с интервалом в 1 минуту;
- Архива за некоторые моменты времени может не быть, требуется отображать факт отсутствия архива;
- Должна быть реализована возможность прокручивания временной шкалы при помощи колёсика мыши и перетаскивания мышью;
- Данные должны подгружаться по мере необходимости.

Описание HTTP API сервера: https://doc.axxonsoft.com/confluence/pages/viewpage.action?pageId=138456556

### Реализация

Смотрим здесь рабочее приложение : :policewoman: http://shavenzov.com/video-archive-viewer/ :policeman:
