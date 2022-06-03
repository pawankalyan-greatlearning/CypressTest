describe('courses filter', () => {
    beforeEach(()=>{
        cy.visit(`https://www.mygreatlearning.com/aws/free-courses`)
    })
    it('checking about topic', () => {
        cy.title().should(`include`, `Free AWS Courses`);
        cy.get('.description').should(`exist`);
        cy.get(`.description`).should(`be.visible`);
    });
    it('filter results', () => {
        cy.get(`#course-filter`).should(`exist`);
        cy.get(`.course-filter-sec #course-filter > div.level.filter > div.level.filter-content label`).each((label)=>{
            cy.get(label).click()
            cy.wait(2000)
             cy.get(label).invoke('text').then((val)=>{
                cy.get(`#course-count`).invoke(`text`).then(text=>{
                    if(text>0){
                        cy.get(`#subject-course-cards > a:nth-child(n) > div > div.course-desc > div.course-info > div:nth-child(2)`).each((element)=>{
                            cy.get(element).invoke(`text`).then((val2)=>{
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
});