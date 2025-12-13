'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { UI_LABELS } from '@/lib/constants/ui'

const ideaSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters'),
  targetMarket: z.string().min(20, 'Please describe your target market'),
  problem: z.string().min(20, 'Please describe the problem you are solving'),
  solution: z.string().min(20, 'Please describe your solution'),
  tags: z.string().optional(),
})

type IdeaFormData = z.infer<typeof ideaSchema>

export function IdeaForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdeaFormData>({
    resolver: zodResolver(ideaSchema),
  })

  const onSubmit = async (data: IdeaFormData) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    router.push('/ideas/1')
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit(onSubmit)}
      className="card-base padding-card-large"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="text-label mb-2 block"
          >
            Idea Title
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            className="input-base"
            placeholder="Enter a clear, concise title for your idea"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-label mb-2 block"
          >
            Description
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={4}
            className="input-gray resize-none"
            placeholder="Provide a detailed description of your business idea"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="targetMarket"
            className="text-label mb-2 block"
          >
            Target Market
          </label>
          <textarea
            {...register('targetMarket')}
            id="targetMarket"
            rows={3}
            className="input-gray resize-none"
            placeholder="Who is your target audience?"
          />
          {errors.targetMarket && (
            <p className="mt-1 text-sm text-red-500">
              {errors.targetMarket.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="problem"
            className="text-label mb-2 block"
          >
            Problem Statement
          </label>
          <textarea
            {...register('problem')}
            id="problem"
            rows={3}
            className="input-gray resize-none"
            placeholder="What problem does your idea solve?"
          />
          {errors.problem && (
            <p className="mt-1 text-sm text-red-500">{errors.problem.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="solution"
            className="text-label mb-2 block"
          >
            Solution
          </label>
          <textarea
            {...register('solution')}
            id="solution"
            rows={3}
            className="input-gray resize-none"
            placeholder="How does your idea solve this problem?"
          />
          {errors.solution && (
            <p className="mt-1 text-sm text-red-500">
              {errors.solution.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tags"
            className="text-label mb-2 block"
          >
            Tags (optional)
          </label>
          <input
            {...register('tags')}
            type="text"
            id="tags"
            className="w-full px-4 py-3 border-2 border-border-color rounded-md focus:outline-none focus:border-accent transition-colors text-base"
            placeholder="e.g., AI, SaaS, Healthcare (comma-separated)"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? UI_LABELS.SUBMITTING : UI_LABELS.SUBMIT_IDEA}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  )
}

