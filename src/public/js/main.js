$(document).ready(function () {
  $("#search").click(function () {

    $.get(`/books/search?authors=${$("#authors").val()}&genres=${$("#genres").val()}&name=${$("#book-name").val()}`, function (data, status) {
      let res = []
      for (var i = 0; i < data.books.length; i++) {

        var $tr = $('<tr>').append(
            $('<td>').text(i + 1),
            $('<td>').text(data.books[i].bookName),
            $('<td>').text(`${data.books[i].firstName} ${data.books[i].lastName}`),
            $('<td>').text(data.books[i].genreName),
            $('<td>').html(` <a class="btn btn-success edit" href="../books/edit/${data.books[i].id}">Edit</a>
                            <a class="btn btn-danger delete" onclick="return alert('Are You sure?')"
                               href="../books/delete/${data.books[i].id}">Delete</a>`)
        );
        res.push($tr);
      }
      $('<tbody>').append(res)
      $("#books tbody ").html(  res);
    });
  });
  $("#reset").click(function () {
    $('.selectpicker').selectpicker('deselectAll');
    $('#book-name').val('');
    $("#search").click();
  });
});

