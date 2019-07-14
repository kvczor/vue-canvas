describe('Canvas', () => {
  afterEach(() => {
    cy.clearLocalStorage();
    cy.reload();
  });

  it('places an image in the canvas selected from the side menu', () => {
    cy.visit('/');
    cy.get('[data-cy=image-list]')
      .children()
      .first()
      .find('img')
      .invoke('attr', 'src')
      .then((imageSource) => {
        cy.get('[data-cy=image-list]').children().first().click();


        cy.get('[data-cy=canvas]')
          .children()
          .first()
          .find('img')
          .invoke('attr', 'src')
          .then((canvasImageSource) => {
            expect(imageSource).to.eq(canvasImageSource);
          });
      });
  });

  it('should remove all images from the canvas after pressing Clear Canvas button', () => {
    cy.get('[data-cy=image-list]')
      .children()
      .first()
      .click();

    cy.get('[data-cy=clear-canvas-button]').click();

    cy.get('[data-cy=canvas]')
      .children()
      .should('not.exist');
  });

  it('should persist canvas children and display them after page reload', () => {
    cy.get('[data-cy=image-list]')
      .children()
      .first()
      .click();


    cy.get('[data-cy=image-list]')
      .children()
      .eq(1)
      .click();

    cy.reload();

    cy.get('[data-cy=canvas]')
      .children()
      .should(children => expect(children).to.have.length(2));
  });

  it('should add text to the canvas with a provided value', () => {
    cy.get('[data-cy=asset-text-input]')
      .clear()
      .type('Test text');

    cy.get('[data-cy=add-asset-text-button]')
      .click();

    cy.get('[data-cy=canvas]')
      .children()
      .first()
      .contains('Test text');
  });


  it('should allow for canvas children to be draggable', () => {
    cy.get('[data-cy=image-list]')
      .children()
      .first()
      .click();

    cy.get('[data-cy=canvas]')
      .children()
      .first()
      .trigger('mousedown')
      .trigger('mousemove', { clientX: 600, clientY: 300 })
      .trigger('mouseup')
      .invoke('attr', 'style')
      .then(style => expect(style).to.eq('top: 145px; left: 264px;'));
  });
});
