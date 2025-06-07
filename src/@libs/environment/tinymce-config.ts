export const tinymceConfig = {
  api: 'no-api-key',
  license_key: 'gpl',
  base_url: '/tinymce',
  language: 'ru',
  language_url: '/tinymce/langs/ru.js',
  height: '530px',
  plugins: [
    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace',
    'table', 'visualblocks', 'wordcount'
  ],
  toolbar: 'undo redo | blocks | bold italic underline strikethrough | ' +
    'link image media table | ' +
    'checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  menu: {
    file: { title: 'Файл', items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations' },
    edit: { title: 'Правка', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
    view: { title: 'Вид', items: 'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
    insert: { title: 'Вставка', items: 'image link media pageembed codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
    format: { title: 'Формат', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks | removeformat' },
    tools: { title: 'Инструменты', items: 'wordcount' },
    table: { title: 'Таблицы', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
    help: { title: 'Помощь', items: 'help' }
  },
};
