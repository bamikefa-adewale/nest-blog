import { Paginated } from "./../interfaces/paginated.interface";
import { Inject, Injectable, Scope, BadRequestException } from "@nestjs/common";
import { ObjectLiteral, Repository } from "typeorm";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";
import { paginationQueryDto } from "src/common/pagination/dtos/pagination_query.dto";
@Injectable({ scope: Scope.REQUEST })
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: paginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    if (
      paginationQuery.page === undefined ||
      paginationQuery.limit === undefined
    ) {
      throw new BadRequestException(
        "'page' and 'limit' query params are required",
      );
    }

    /**
     * Creating the request URLs
     */
    const page = paginationQuery.page;
    const limit = paginationQuery.limit;

    const results = await repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const baseUrl =
      this.request.protocol + "://" + this.request.headers.host + "/";
    const newUrl = new URL(this.request.url, baseUrl);

    console.log(newUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);

    const nextPage = page === totalPages ? page : page + 1;
    const previousPage = page === 1 ? page : page - 1;

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        TotalItems: totalItems,
        currentPage: paginationQuery.page,
        toatlPage: totalPages,
      },
      links: {
        firstPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        lastPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        currentPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        nextPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previousPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
      },
    };

    return finalResponse;
  }
}
