import { Button } from '@documenso/ui/primitives/button';
import { Trans } from '@lingui/react/macro';
import { Link } from 'react-router';

// Bethof: electronic signature terms under Brazilian law (draft dated 25/10/2026, pending review by the Bethof lawyer),
// replacing the original Documenso disclosure, which followed US law (E-Sign Act). The text is Portuguese only.
export default function SignatureDisclosure() {
  return (
    <div>
      <article className="prose dark:prose-invert">
        <h1>Termo de consentimento para assinatura eletrônica</h1>

        <h2>Boas-vindas</h2>
        <p>
          Este é o portal de assinatura eletrônica da Bethof Solutions Ltda. Por aqui você recebe, lê e assina documentos
          enviados pela Bethof sem precisar imprimir nada. Leia este termo antes de continuar: ele explica como a
          assinatura funciona e quais são os seus direitos.
        </p>

        <h2>Aceite e consentimento</h2>
        <p>
          Ao seguir para a assinatura, você declara que leu este termo e concorda em receber e assinar documentos em
          formato eletrônico. Você também aceita como válido o meio usado pelo portal para comprovar quem assinou e que o
          documento não foi alterado, nos termos do art. 10, § 2º, da Medida Provisória 2.200-2/2001.
        </p>

        <h2>Validade jurídica das assinaturas eletrônicas</h2>
        <p>
          A assinatura feita neste portal tem validade jurídica. A lei brasileira não exige forma especial para a maioria
          dos contratos (Código Civil, art. 107) e admite a assinatura eletrônica como prova de autoria e integridade
          (Medida Provisória 2.200-2/2001, art. 10, § 2º). Cada assinatura fica registrada com nome, e-mail, data, hora,
          endereço de internet e o código de verificação enviado ao seu e-mail. Ao final, o documento recebe o selo
          digital da Bethof Solutions Ltda e um carimbo de tempo, e qualquer alteração posterior fica visível. Quando for
          o caso, o documento assinado vale como título executivo (Código de Processo Civil, art. 784, § 4º).
        </p>

        <h2>Requisitos do sistema</h2>
        <p>Para assinar, você precisa de:</p>
        <ul>
          <li>acesso à internet;</li>
          <li>um navegador atualizado, como Chrome, Edge, Firefox ou Safari, no computador ou no celular;</li>
          <li>um endereço de e-mail válido, que só você acesse, para receber o convite e o código de verificação;</li>
          <li>um programa que abra arquivos PDF, para ler e guardar a sua cópia.</li>
        </ul>

        <h2>Entrega eletrônica de documentos</h2>
        <p>
          Os documentos, os avisos e as cópias assinadas são entregues por e-mail e ficam disponíveis neste portal. A
          Bethof também pode avisar pelo WhatsApp que há um documento esperando por você. Se preferir receber uma cópia em
          papel, peça pelo e-mail solutions@bethof.com.br.
        </p>

        <h2>Consentimento para transações eletrônicas</h2>
        <p>
          Você concorda em fazer por meio eletrônico esta assinatura e os atos ligados a ela, como receber o documento,
          confirmar a sua identidade pelo código e receber a cópia final. Se a lei exigir outra forma para algum documento
          específico, a Bethof avisará antes.
        </p>

        <h2>Retirada do consentimento</h2>
        <p>
          Você pode desistir da assinatura eletrônica a qualquer momento antes de assinar. Basta recusar o documento no
          próprio portal ou avisar pelo e-mail solutions@bethof.com.br, e a Bethof combinará outra forma de assinatura. A
          desistência não afeta os documentos que você já assinou.
        </p>

        <h2>Atualização dos seus dados</h2>
        <p>
          Se o seu e-mail ou telefone mudar, avise a Bethof antes de assinar. O convite e o código de verificação vão para
          o e-mail cadastrado, e um endereço errado pode atrasar ou impedir a sua assinatura.
        </p>

        <h2>Guarda dos documentos</h2>
        <p>
          Ao final, você recebe por e-mail o documento assinado, com o certificado de conclusão e o registro de cada etapa.
          Guarde essa cópia. A Bethof mantém o documento e o registro de assinatura pelo prazo necessário para cumprir a
          lei e defender os direitos das partes, em geral por 10 anos. Os seus dados são tratados para executar o contrato
          e para o exercício regular de direitos (Lei 13.709/2018, art. 7º, V e VI), e você pode exercer os direitos do
          art. 18 da mesma lei pelos contatos abaixo.
        </p>

        <h2>Ciência</h2>
        <p>
          Ao clicar para assinar, você confirma que leu e entendeu o documento e este termo, que os seus dados estão
          corretos e que a sua assinatura eletrônica tem o mesmo valor da sua assinatura em papel.
        </p>

        <h2>Contato</h2>
        <p>
          Bethof Solutions Ltda, CNPJ 27.886.567/0001-63, CRC-SC 010982. Rua Walter Schmoegel, 93, Sala 02, Centro,
          Agrolândia/SC, CEP 88420-000. E-mail solutions@bethof.com.br, WhatsApp (47) 98915-6977. Política de
          privacidade:{' '}
          <a href="https://bethof.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
            https://bethof.com.br/politica-de-privacidade
          </a>
        </p>
      </article>

      <div className="mt-8">
        <Button asChild>
          <Link to="/">
            <Trans>Back home</Trans>
          </Link>
        </Button>
      </div>
    </div>
  );
}
