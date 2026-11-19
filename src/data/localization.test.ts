import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getLocalizedAgents,
  getLocalizedBlogPosts,
  getLocalizedFaqs,
  getLocalizedInvoices,
  getLocalizedLeads,
  getLocalizedPlans,
  getLocalizedTasks,
  translateAgentStatus,
  translateInvoiceStatus,
  translateLeadStage,
  translateTrustLevel,
} from './mockData';

function assertNoEnglishWords(value: string, context: string) {
  assert.equal(
    /[A-Za-z]/.test(value),
    false,
    `Unexpected Latin characters in Persian field (${context}): "${value}"`
  );
}

test('Persian datasets match English lengths and contain no stray English text', () => {
  const agentsFa = getLocalizedAgents('fa');
  assert.equal(agentsFa.length, getLocalizedAgents('en').length);
  for (const a of agentsFa) {
    assertNoEnglishWords(a.name, `agent.name:${a.id}`);
    assertNoEnglishWords(a.role, `agent.role:${a.id}`);
    assertNoEnglishWords(a.schedule, `agent.schedule:${a.id}`);
    assertNoEnglishWords(a.description, `agent.description:${a.id}`);
  }

  const leadsFa = getLocalizedLeads('fa');
  assert.equal(leadsFa.length, getLocalizedLeads('en').length);
  for (const l of leadsFa) {
    assertNoEnglishWords(l.company, `lead.company:${l.id}`);
    assertNoEnglishWords(l.contactName, `lead.contactName:${l.id}`);
    assertNoEnglishWords(l.source, `lead.source:${l.id}`);
    assertNoEnglishWords(l.lastTouch, `lead.lastTouch:${l.id}`);
  }

  const tasksFa = getLocalizedTasks('fa');
  assert.equal(tasksFa.length, getLocalizedTasks('en').length);
  for (const t of tasksFa) {
    assertNoEnglishWords(t.title, `task.title:${t.id}`);
    assertNoEnglishWords(t.owner, `task.owner:${t.id}`);
    assertNoEnglishWords(t.dueDate, `task.dueDate:${t.id}`);
  }

  const invoicesFa = getLocalizedInvoices('fa');
  assert.equal(invoicesFa.length, getLocalizedInvoices('en').length);
  for (const inv of invoicesFa) {
    assertNoEnglishWords(inv.id, `invoice.id:${inv.id}`);
    assertNoEnglishWords(inv.client, `invoice.client:${inv.id}`);
    assertNoEnglishWords(inv.amount, `invoice.amount:${inv.id}`);
    assertNoEnglishWords(inv.dueDate, `invoice.dueDate:${inv.id}`);
  }

  const plansFa = getLocalizedPlans('fa');
  assert.equal(plansFa.length, getLocalizedPlans('en').length);
  for (const p of plansFa) {
    assertNoEnglishWords(p.name, `plan.name:${p.id}`);
    assertNoEnglishWords(p.price, `plan.price:${p.id}`);
    assertNoEnglishWords(p.period, `plan.period:${p.id}`);
    assertNoEnglishWords(p.description, `plan.description:${p.id}`);
    for (const f of p.features) {
      assertNoEnglishWords(f, `plan.feature:${p.id}`);
    }
  }

  const faqsFa = getLocalizedFaqs('fa');
  assert.equal(faqsFa.length, getLocalizedFaqs('en').length);
  for (const faq of faqsFa) {
    assertNoEnglishWords(faq.q, 'faq.q');
    assertNoEnglishWords(faq.a, 'faq.a');
  }

  const postsFa = getLocalizedBlogPosts('fa');
  assert.equal(postsFa.length, getLocalizedBlogPosts('en').length);
  for (const post of postsFa) {
    assertNoEnglishWords(post.title, `post.title:${post.id}`);
    assertNoEnglishWords(post.excerpt, `post.excerpt:${post.id}`);
    assertNoEnglishWords(post.category, `post.category:${post.id}`);
    assertNoEnglishWords(post.author, `post.author:${post.id}`);
    assertNoEnglishWords(post.date, `post.date:${post.id}`);
    assertNoEnglishWords(post.readTime, `post.readTime:${post.id}`);
    assertNoEnglishWords(post.content, `post.content:${post.id}`);
  }
});

test('status and stage translators localize all union values in Persian', () => {
  assertNoEnglishWords(translateTrustLevel('Observe', 'fa'), 'trust.Observe');
  assertNoEnglishWords(translateTrustLevel('Propose', 'fa'), 'trust.Propose');
  assertNoEnglishWords(translateTrustLevel('Act with approval', 'fa'), 'trust.Act');
  assertNoEnglishWords(translateTrustLevel('Autonomous', 'fa'), 'trust.Autonomous');

  assertNoEnglishWords(translateAgentStatus('active', 'fa'), 'status.active');
  assertNoEnglishWords(translateAgentStatus('paused', 'fa'), 'status.paused');
  assertNoEnglishWords(translateAgentStatus('running', 'fa'), 'status.running');

  assertNoEnglishWords(translateLeadStage('New', 'fa'), 'stage.New');
  assertNoEnglishWords(translateLeadStage('Qualified', 'fa'), 'stage.Qualified');
  assertNoEnglishWords(translateLeadStage('Meeting Booked', 'fa'), 'stage.Meeting');
  assertNoEnglishWords(translateLeadStage('Proposal', 'fa'), 'stage.Proposal');
  assertNoEnglishWords(translateLeadStage('Closed Won', 'fa'), 'stage.ClosedWon');

  assertNoEnglishWords(translateInvoiceStatus('Paid', 'fa'), 'inv.Paid');
  assertNoEnglishWords(translateInvoiceStatus('Sent', 'fa'), 'inv.Sent');
  assertNoEnglishWords(translateInvoiceStatus('Overdue', 'fa'), 'inv.Overdue');
  assertNoEnglishWords(translateInvoiceStatus('Draft', 'fa'), 'inv.Draft');
});
