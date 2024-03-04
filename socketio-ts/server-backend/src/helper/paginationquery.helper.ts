import { Request } from 'express';
import { removeParameterFromURL } from './url.helper';
import { Document } from 'mongoose';
import { config } from '../config/index.config';

interface PaginateFormData {
    api_url?: string;
    page?: number;
    perPage?: number;
}

interface Paginator {
    current_page: number;
    total_pages: number;
    previous_page_url: string | null;
    next_page_url: string | null;
    record_per_page: number;
    current_page_items_count: number;
    total_count: number;
    pagination_last_page: number;
    offset: number;
}

interface PaginateResult<T> {
    paginator: Paginator;
    items: T[];
}

interface PaginateParams {
    request: Request;
    formData: PaginateFormData;
    query: any;
    isLean?: boolean;
    sort?: any | null;
    aggregate?: any | null;
}

export const paginate = async<T extends Document>(
    {
        request,
        formData,
        query,
        sort = null,
        aggregate
    }: PaginateParams
): Promise<PaginateResult<T>> => {
    const {
        api_url = removeParameterFromURL(config.app.base_url + request.originalUrl, 'page'),
        page = 1,         // default page 1
        perPage = 10,      // default per page 10 records show
    } = formData;


    let currentPage = parseInt(page.toString()) || 1; // default current page 1
    let total_count = await query.countDocuments() || 0;
    let pageCount = Math.ceil(total_count / perPage);
    let previousPage = currentPage > 1 ? (currentPage - 1) : 0; // null to 0 updated ====================
    let nextPage = pageCount > currentPage ? (currentPage + 1) : null;
    let current_page_items_count = currentPage == 1 ? perPage : (total_count - (perPage * previousPage)) || 0;
    let offset = currentPage > 1 ? previousPage * perPage : 0; // start from 0,10,20,30

    let paginator: Paginator = {
        current_page: currentPage,
        total_pages: pageCount,
        previous_page_url: previousPage ? `${api_url}?page=${previousPage}` : null,
        next_page_url: nextPage ? `${api_url}?page=${nextPage}` : null,
        record_per_page: perPage,
        current_page_items_count: current_page_items_count,
        total_count: total_count,
        pagination_last_page: pageCount,
        offset: offset,
    };
    console.log(perPage);
    

    // worked
    // const items = await query
    //     .find(filter)
    //     // .aggregate(aggregate)
    //     .lean(isLean)
    //     .populate(populate)
    //     .limit(perPage)
    //     .skip(offset)
    //     .sort(sort)

    // Sort
    if (sort) {
        aggregate = [
            ...aggregate,
            {
                $sort: sort // Replace 'your_sort_field' with the actual field for sorting
            }
        ]
    }

    // Skip : Offset
    aggregate = [
        ...aggregate,
        {
            $skip: offset // Replace 'your_sort_field' with the actual field for sorting
        }
    ]

    // limit
    aggregate = [
        ...aggregate,
        {
            $limit: perPage // Replace 'your_sort_field' with the actual field for sorting
        }
    ]



    const items = await query.aggregate(aggregate)

    // .exec((err: any, items: any) => {
    //     if (err) {
    //         console.error(err);
    //         // Handle the error
    //     } else {
    //         // Process the results
    //         console.log(items);
    //     }
    // });

    return { paginator, items };
};


export const paginationquery = {
    paginate
}


// ---------usage 1------------
// let formData = { ...req?.query, ...req?.body }

// return await paginationquery.paginate({
//     request: req, formData: formData, query: AppModel, populate: { path: 'namespace' }, isLean: true, sort: null
// });