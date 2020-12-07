$(document).ready(function () {
  $("#search").click(function () {

    $.get(`/books/search?authors=${$("#authors").val()}&genres=${$("#authors").val()}&name=${$("#book-name").val()}`, function (data, status) {
      let res = []
      for (const [index, book] of data.books.entries()) {

        var $tr = $('<tr>').append(
            $('<td>').text(index + 1),
            $('<td>').text(book.bookName),
            $('<td>').text(`${book.firstName} ${book.lastName}`),
            $('<td>').text(book.genreName),
            $('<td>').html(` <a class="btn btn-success edit" href="../books/edit/${book.id}">Edit</a>
                            <a class="btn btn-danger delete" onclick="return alert('Are You sure?')"
                               href="../books/delete/${book.id}">Delete</a>`)
        );
        res.push($tr);
      }
      console.log(res);
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

