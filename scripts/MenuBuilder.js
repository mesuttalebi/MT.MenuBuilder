$(function () {
    var editliItem = undefined;

    $('.dd').nestable({ /* config options */ });

    $('#addOrEditMenuItem').on('click', function () {
        var title = $('#title').val();
        if (title.length > 0) {
            var link = $('#link').val();
            var targetBlank = $('#targetBlank').is(':checked');

            if (editliItem == undefined) {
                var listItem = '<li class="dd-item" data-title="' + title + '" data-link="' + link + '" data-targetBlank="'
                    + targetBlank + '" title="' + link + '">' +
                    '<span class="action action-remove pull-right badge">x</span>' +
                    '<span class="action action-edit pull-right badge"><i class="fa fa-edit"></i></span>' +
                    '<div class="dd-handle">' + title + '</div></li>';


                $('.dd>.dd-list').append(listItem);
            } else {
                $(editliItem).attr('data-title', title);
                $(editliItem).attr('data-link', link);
                $(editliItem).attr('data-targetBlank', targetBlank);
                $(editliItem).find('.dd-handle').text(title);

                $('#addOrEditMenuItem').text('Ekle');
				editliItem = undefined;
            }


            $('input#MenuJson').val(JSON.stringify($('.dd').nestable('serialize')));
            $('.validation-summary-errors').hide();

            //Clear forms
            $('#link').val('');
            $('#title').val('');
            $('#targetBlank').removeAttr('checked');
        } else {
            var html = '<div class="alert alert-warning alert-dismissable">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            $('#message').html(html + 'Menu Başlığını Giriniz!</div>');
        }
    });

    $(document).on('click', '.dd-list span.action-remove', function () {
        $(this).closest('li.dd-item').remove();
        $('input#MenuJson').val(JSON.stringify($('.dd').nestable('serialize')));
    });

    $('.dd').on('change', function () {
        $('input#MenuJson').val(JSON.stringify($('.dd').nestable('serialize')));
    });

    $(document).on('click', '.dd-list span.action-edit', function () {
        var liItem = $(this).closest('li.dd-item');
        $('#title').val($(liItem).attr('data-title'));
        $('#link').val($(liItem).attr('data-link'));
        var checked = $(liItem).attr('data-targetBlank');

        if (checked == "true")
            $('#targetBlank').attr('checked', 'checked');
        else
            $('#targetBlank').removeAttr('checked');

        editliItem = liItem;
        $('#addOrEditMenuItem').text('Güncelle');
    });
});