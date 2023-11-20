import { removeParameterFromURL } from './URLHelper.js';

export const paginate = async (request, formData, Model) => {

    const {
        api_url = removeParameterFromURL(process.env.BASE_URL + request.originalUrl, 'page'),
        page = 1,         // default page 1
        perPage = 10,      // default per page 10 records show
    } = formData;

    let currentPage = parseInt(page || 1); // default current page 1
    let total_count = await Model.countDocuments() || 0;
    let pageCount = Math.ceil(total_count / perPage);
    let previousPage = currentPage > 1 ? (currentPage - 1) : null;
    let nextPage = pageCount > currentPage ? (currentPage + 1) : null;
    let current_page_items_count = currentPage == 1 ? perPage : (total_count - (perPage * previousPage)) || 0;
    let offset = currentPage > 1 ? previousPage * perPage : 0; // start from 0,10,20,30


    let paginator = {
        "current_page": currentPage,
        "total_pages": pageCount,
        "previous_page_url": previousPage ? api_url + '?page=' + previousPage : null,
        "next_page_url": nextPage ? api_url + '?page=' + nextPage : null,
        "record_per_page": perPage,
        "current_page_items_count": current_page_items_count,
        "total_count": total_count,
        "pagination_last_page": pageCount,
        "offset": offset,
    }

    const items = await Model.aggregate([
        { $sort: { _id: -1 } },
    ]).skip((page - 1) * perPage)
        .limit(perPage);

    return { paginator, items };
}

