describe('courses filter', () => {
    beforeEach(() => {
        cy.visit(`https://www.mygreatlearning.com/aws/free-courses`)
    })
    it('checking about topic', () => {
        cy.title().should(`include`, `Free AWS Courses`);
        cy.get('div.description').should(`exist`);
        cy.get(`div.description`).should(`be.visible`);
    });
    it.only('filter results', () => {
        cy.get(`#course-filter`).should(`exist`);
        // cy.get(`div.course-filter-sec #course-filter > div.level.filter > div.level.filter-content label`)
        cy.get('div.course-filter-sec').children('div.level.filter').find('ul').find('label').parentsUntil('div.course-filter-sec')
            .each((label) => {
                // cy.log(label)
                cy.get(label).click()
                cy.wait(2000)
                cy.get(label).invoke('text').then((val) => {
                    cy.get(`#course-count`)
                        .invoke(`text`)
                        .then(text => {
                            if (text > 0) {
                                cy.get(`#subject-course-cards > a:nth-child(n) > div > div.course-desc > div.course-info > div:nth-child(2)`)
                                    .each((element) => {
                                        cy.get(element)
                                            .invoke(`text`)
                                            .then((val2) => {
                                                //    cy.log(val, val2)
                                                expect(val.trim()).equal(val2.trim())
                                            })
                                    })
                            }
                        })
                })
                cy.get(label).click()
            })
    });

    it(`courses section`, () => {
        cy.get(`.subject-courses`).should(`exist`);
        cy.get(`.subject-courses`).should(`be.visible`);
        cy.get(`#subject-course-cards > a`).its(`length`).should(`be.gte`, 10)
        cy.get(`#pagination`).should(`be.visible`);
        cy.get(`a[id='next-nav']`).invoke(`attr`, `href`).then(href => {
            cy.request(href).its(`status`).should(`eq`, 200);

        })
        cy.get(`a[id='prev-nav']`).invoke(`attr`, `href`).then(href => {
            cy.request(href).its(`status`).should(`eq`, 200);
        })
    })


    it('pgp course section', () => {
        cy.get(`.subject-pgp-section`).should(`exist`);
        cy.get(`.subject-pgp-section`).should(`be.visible`);
        cy.get(`#subject-pgp-cards > div:nth-child(n) > div:nth-child(n)`).its(`length`).should(`be.gte`, 0)
        cy.get(`#subject-pgp-cards > div:nth-child(n) > div:nth-child(n)`).each(($card) => {
            cy.get($card).find(`a`).invoke('attr', 'href').then(href => {
                cy.request(href).its('status').should('eq', 200);

            });
        })
    })

    it(`similar subject section`, () => {
        cy.get(`.similar-subject-section`).should(`exist`);
        cy.get(`.similar-subject-section`).should(`be.visible`);
        cy.get(`#similar-subject-cards > div > a`).its(`length`).should(`be.eql`, 4)
    })

    it(`SEO section`, () => {
        cy.get(`.seo-content-sec`).should(`exist`);
        cy.get(`.seo-content-sec`).should(`be.visible`);
    })

    it(`career path`, () => {
        cy.get(`.subject-career-path-section`).should(`exist`);
        cy.get(`#subject-career-path-cards > div:nth-child(n) > div > div`).its(`length`).should(`be.eql`, 4)
    })

    it(`testimonial`, () => {
        cy.get(`.subject-testimonial-section`).should(`exist`);
        cy.get(`.subject-testimonial-section`).should(`be.visible`);
    })

    it(`FAQ`, () => {
        cy.get(`#faq > .container`).should(`exist`);
        cy.get(`#faq > .container`).should(`be.visible`);
    })
});