'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-api-tutorial documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-1605c88b889a7db6331d8b1965facc43b722a879d440458b78c42df7c8e7aa2e76ec705c1f331a445f4c70265e54ac754dd39f60ede6fd559c8bad06b8b957f9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-1605c88b889a7db6331d8b1965facc43b722a879d440458b78c42df7c8e7aa2e76ec705c1f331a445f4c70265e54ac754dd39f60ede6fd559c8bad06b8b957f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-1605c88b889a7db6331d8b1965facc43b722a879d440458b78c42df7c8e7aa2e76ec705c1f331a445f4c70265e54ac754dd39f60ede6fd559c8bad06b8b957f9"' :
                                            'id="xs-controllers-links-module-AuthModule-1605c88b889a7db6331d8b1965facc43b722a879d440458b78c42df7c8e7aa2e76ec705c1f331a445f4c70265e54ac754dd39f60ede6fd559c8bad06b8b957f9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-1605c88b889a7db6331d8b1965facc43b722a879d440458b78c42df7c8e7aa2e76ec705c1f331a445f4c70265e54ac754dd39f60ede6fd559c8bad06b8b957f9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-1605c88b889a7db6331d8b1965facc43b722a879d440458b78c42df7c8e7aa2e76ec705c1f331a445f4c70265e54ac754dd39f60ede6fd559c8bad06b8b957f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-1605c88b889a7db6331d8b1965facc43b722a879d440458b78c42df7c8e7aa2e76ec705c1f331a445f4c70265e54ac754dd39f60ede6fd559c8bad06b8b957f9"' :
                                        'id="xs-injectables-links-module-AuthModule-1605c88b889a7db6331d8b1965facc43b722a879d440458b78c42df7c8e7aa2e76ec705c1f331a445f4c70265e54ac754dd39f60ede6fd559c8bad06b8b957f9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookmarkModule.html" data-type="entity-link" >BookmarkModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-d2f5ea03f42f3391fcbe261c864960bc19cf8c9c4b5d908856c6d49c2ac113bf9fdabfc62e9e0573e6e9e4d4e158500e775f4a4a3e31740e157e0d2505b31313"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-d2f5ea03f42f3391fcbe261c864960bc19cf8c9c4b5d908856c6d49c2ac113bf9fdabfc62e9e0573e6e9e4d4e158500e775f4a4a3e31740e157e0d2505b31313"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-d2f5ea03f42f3391fcbe261c864960bc19cf8c9c4b5d908856c6d49c2ac113bf9fdabfc62e9e0573e6e9e4d4e158500e775f4a4a3e31740e157e0d2505b31313"' :
                                            'id="xs-controllers-links-module-PostsModule-d2f5ea03f42f3391fcbe261c864960bc19cf8c9c4b5d908856c6d49c2ac113bf9fdabfc62e9e0573e6e9e4d4e158500e775f4a4a3e31740e157e0d2505b31313"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-d2f5ea03f42f3391fcbe261c864960bc19cf8c9c4b5d908856c6d49c2ac113bf9fdabfc62e9e0573e6e9e4d4e158500e775f4a4a3e31740e157e0d2505b31313"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-d2f5ea03f42f3391fcbe261c864960bc19cf8c9c4b5d908856c6d49c2ac113bf9fdabfc62e9e0573e6e9e4d4e158500e775f4a4a3e31740e157e0d2505b31313"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-d2f5ea03f42f3391fcbe261c864960bc19cf8c9c4b5d908856c6d49c2ac113bf9fdabfc62e9e0573e6e9e4d4e158500e775f4a4a3e31740e157e0d2505b31313"' :
                                        'id="xs-injectables-links-module-PostsModule-d2f5ea03f42f3391fcbe261c864960bc19cf8c9c4b5d908856c6d49c2ac113bf9fdabfc62e9e0573e6e9e4d4e158500e775f4a4a3e31740e157e0d2505b31313"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-96e276e1e228374ed81d7bc91aff14ba0da86fcd07bc46a9e62fcfa2071daf2af2d2a03502b8dab019933c6c0ddb5a0e53c5f144627941554695cd80ca4d8dbe"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-96e276e1e228374ed81d7bc91aff14ba0da86fcd07bc46a9e62fcfa2071daf2af2d2a03502b8dab019933c6c0ddb5a0e53c5f144627941554695cd80ca4d8dbe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-96e276e1e228374ed81d7bc91aff14ba0da86fcd07bc46a9e62fcfa2071daf2af2d2a03502b8dab019933c6c0ddb5a0e53c5f144627941554695cd80ca4d8dbe"' :
                                            'id="xs-controllers-links-module-UsersModule-96e276e1e228374ed81d7bc91aff14ba0da86fcd07bc46a9e62fcfa2071daf2af2d2a03502b8dab019933c6c0ddb5a0e53c5f144627941554695cd80ca4d8dbe"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-96e276e1e228374ed81d7bc91aff14ba0da86fcd07bc46a9e62fcfa2071daf2af2d2a03502b8dab019933c6c0ddb5a0e53c5f144627941554695cd80ca4d8dbe"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-96e276e1e228374ed81d7bc91aff14ba0da86fcd07bc46a9e62fcfa2071daf2af2d2a03502b8dab019933c6c0ddb5a0e53c5f144627941554695cd80ca4d8dbe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-96e276e1e228374ed81d7bc91aff14ba0da86fcd07bc46a9e62fcfa2071daf2af2d2a03502b8dab019933c6c0ddb5a0e53c5f144627941554695cd80ca4d8dbe"' :
                                        'id="xs-injectables-links-module-UsersModule-96e276e1e228374ed81d7bc91aff14ba0da86fcd07bc46a9e62fcfa2071daf2af2d2a03502b8dab019933c6c0ddb5a0e53c5f144627941554695cd80ca4d8dbe"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppService.html" data-type="entity-link" >AppService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionDto.html" data-type="entity-link" >CreatePostMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostsDto.html" data-type="entity-link" >PatchPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService-1.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostService.html" data-type="entity-link" >PostService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService-1.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});