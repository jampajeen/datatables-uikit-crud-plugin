/* 
 * jQuery plugin : datatables-uikit-crud-plugin
 * Version 0.0.1
 * Author: Thitipong Jampajeen
 * https://github.com/jampajeen/datatables-uikit-crud-plugin
 * License: MIT
 */
(function ($) {

    $.fn.vhDataTables = function (options) {
        var mytable = this;
        var defaults = {
            // modal
            selectorModalAdd: '#form-modal-add',
            selectorModalView: '#form-modal-view',
            selectorModalEdit: '#form-modal-edit',
            // loading mask
            selectorLoadingAdd: '#loading-mask-add',
            selectorLoadingView: '#loading-mask-view',
            selectorLoadingEdit: '#loading-mask-edit',
            // column data
            columns: [],
            customSearchParams: {},
            // callback func
            onAjaxDataResponse: function (data) {
                console.log('onAjaxDataResponse');
            },
            onClickAdd: function () {
                console.log('onClickAdd');
            },
            onClickRefresh: function () {
                console.log('onClickRefresh');
            },
            onClickView: function (data) {
                console.log('onClickView');
            },
            onClickEdit: function (data) {
                console.log('onClickEdit');
            },
            onClickDelete: function (data) {
                console.log('onClickDelete');
            },
            onConfirmDelete: function (data) {
                console.log('onConfirmDelete');
            },
            // submit
            onSubmitAdd: function (data) {
                console.log('onSubmitAdd');
            },
            onSubmitEdit: function (data) {
                console.log('onSubmitEdit');
            }
        };

        // apply options
        var settings = $.extend({}, defaults, options);
        var nTable = this;
        var columns = settings.columns;
        var dataUrl = settings.dataUrl;
        var colIndex = settings.columns.length;

        var table = nTable.DataTable({
			//"responsive": true,
            "searching": true,
            "ordering": true,
            "order": [[0, "desc"]],
            "processing": true,
            "serverSide": true,
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            //"deferRender": true,
            "bStateSave": true,
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('DataTables_' + window.location.pathname));
            },
            "ajax": {
                "type": "GET",
                "dataType": "json",
                "url": dataUrl + ((dataUrl.indexOf('?') === -1) ? '?' : '&') + $.param(settings.customSearchParams),
                "data": function (d) {
                    settings.onAjaxDataResponse(d);
                }
            },
            "columns": columns,
            "pagingType": "full_numbers",
            "columnDefs": [
                {
                    "targets": colIndex + 0,
                    "data": null,
                    "render": function (data, type, row) {
                        return '<a href="#" class="vh-dt-view"> <i class="uk-icon-search"></i> </a>';
                    }
                },
                {
                    "targets": colIndex + 1,
                    "data": null,
                    "render": function (data, type, row) {
                        return '<a href="#" class="vh-dt-edit"> <i class="uk-icon-edit"></i> </a>';
                    }
                },
                {
                    "targets": colIndex + 2,
                    "data": null,
                    "render": function (data, type, row) {
                        return '<a href="#" class="vh-dt-remove"> <i class="uk-icon-remove"></i> </a>';
                    }
                }
            ]
        });

        this.reload = function (sortDir) {
            //var sortDir = sortDir || 'desc';
            if (sortDir) {
                table.order([0, sortDir]).draw();
            } else {
                table.draw(false);
            }
        };

        this.showLoadingAdd = function (flag) {
            if (flag) {
                $(settings.selectorLoadingAdd).show();
            } else {
                $(settings.selectorLoadingAdd).hide();
            }
        };
        this.showLoadingEdit = function (flag) {
            if (flag) {
                $(settings.selectorLoadingEdit).show();
            } else {
                $(settings.selectorLoadingEdit).hide();
            }
        };
        this.showLoadingView = function (flag) {
            if (flag) {
                $(settings.selectorLoadingView).show();
            } else {
                $(settings.selectorLoadingView).hide();
            }
        };

        this.showModalAdd = function (flag) {
            if (flag) {
                addModal.show();
            } else {
                addModal.hide();
            }
        };
        this.showModalEdit = function (flag) {
            if (flag) {
                editModal.show();
            } else {
                editModal.hide();
            }
        };
        this.showModalView = function (flag) {
            if (flag) {
                viewModal.show();
            } else {
                viewModal.hide();
            }
        };

        /*
         * Modal
         */
        var initAddModal = function () {
            $(settings.selectorLoadingAdd).hide();

            var modal = UIkit.modal(UIkit.$(settings.selectorModalAdd), {bgclose: false, keyboard: true, modal: true, center: true});

            modal.find('form').submit(function (e) {
                var form = UIkit.$(this);
                var data = form.serialize();
                e.preventDefault();

                settings.onSubmitAdd(data, modal);
            });

            return modal;
        };
        var addModal = initAddModal();


        var initEditModal = function () {
            $(settings.selectorLoadingEdit).hide();

            var modal = UIkit.modal(UIkit.$(settings.selectorModalEdit), {bgclose: false, keyboard: true, modal: true, center: true});

            modal.find('form').submit(function (e) {
                var form = UIkit.$(this);
                var data = form.serialize();
                e.preventDefault();

                var obj = JSON.parse('{"' + decodeURIComponent(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\s/g, '') + '"}')
                settings.onSubmitEdit(obj);
            });

            return modal;
        };
        var editModal = initEditModal();

        var initViewModal = function () {
            $(settings.selectorLoadingView).hide();

            var modal = UIkit.modal(UIkit.$(settings.selectorModalView), {bgclose: false, keyboard: true, modal: true, center: true});
            return modal;
        };
        var viewModal = initViewModal();


        /*
         * view icon
         */
        nTable.on('click', 'a.vh-dt-view', function (e) {
            var data = table.row($(this).parents('tr')).data();
            viewModal.show();

            settings.onClickView(data);
        });

        /*
         * edit icon
         */
        nTable.on('click', 'a.vh-dt-edit', function (e) {
            var data = table.row($(this).parents('tr')).data();
            editModal.show();

            settings.onClickEdit(data);
        });

        /*
         * delete icon
         */
        nTable.on('click', 'a.vh-dt-remove', function (e) {
            var data = table.row($(this).parents('tr')).data();

            settings.onClickDelete(data);

            UIkit.modal.confirm("Do you want to delete this item?", function () {
                settings.onConfirmDelete(data);
            });

        });

        /*
         * Reload button
         */
        $('div.dataTables_filter').find("label").html("<div></div>");
        var refreshBtn = $('<button id="vhdatatables-btn-refresh" class="uk-icon-refresh uk-button uk-button-primary">&nbsp;Refresh</button>');
        refreshBtn.appendTo('div.dataTables_filter');
        refreshBtn.on('click', function (e) {
            settings.onClickRefresh();
            mytable.reload();
        });

        $('<span>&nbsp;</span>').appendTo('div.dataTables_filter');

        /*
         * Add button
         */
        var addBtn = $('<button id="vhdatatables-btn-add" class="uk-icon-plus uk-button uk-button-primary" >&nbsp;Add New</button>');
        addBtn.appendTo('div.dataTables_filter');
        addBtn.on('click', function (e) {
            addModal.show();
            settings.onClickAdd();
        });

        return this;
    };

}(jQuery));